import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';

const downloadImage = (url: string, dest: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (error) => {
        fs.unlink(dest, () => {
          reject(error.message);
        });
      });
  });
};

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async uploadFile(
    file: Express.Multer.File | Express.MulterS3.File,
  ): Promise<FileEntity> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = {
      local: `/${this.configService.get('app.apiPrefix')}/v1/${file.path}`,
      s3: (file as Express.MulterS3.File).location,
    };

    return this.fileRepository.save(
      this.fileRepository.create({
        path: path[this.configService.get('file.driver')],
      }),
    );
  }

  async generateSignedUrl(body: any): Promise<string> {
    const { key } = body;
    const s3 = new S3({
      region: this.configService.get('file.awsS3Region'),
      signatureVersion: 'v4',
      credentials: {
        accessKeyId: this.configService.get('file.accessKeyId'),
        secretAccessKey: this.configService.get('file.secretAccessKey'),
      },
    });

    const params = {
      Bucket: this.configService.get('file.awsDefaultS3Bucket'),
      Key: key,
      Expires: 3600, // The URL will be valid for 1 hour
    };

    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
  }

  async Upload_to_S3(Urls: any, filePath: string): Promise<any> {
    const s3 = new S3({
      region: this.configService.get('file.awsS3Region'),
      signatureVersion: 'v4',
      credentials: {
        accessKeyId: this.configService.get('file.accessKeyId'),
        secretAccessKey: this.configService.get('file.secretAccessKey'),
      },
    });

    const DownloadPaths = [];
    const resolvedUrls = [];
    for (let i = 0; i < Urls.length; i++) {
      const url = Urls[i];
      const filename = `${Date.now()}.jpg`;
      const downloadPath = `./tmp/${filename}`;
      await downloadImage(url, downloadPath);
      DownloadPaths.push(downloadPath);
      const fileContent = fs.readFileSync(downloadPath);

      const params = {
        Bucket: this.configService.get('file.awsDefaultS3Bucket'),
        Key: filename,
        Body: fileContent,
      };

      const res = await s3.upload(params).promise();
      const Url = res.Location;

      resolvedUrls.push(Url);
    }
    // if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    for (let i = 0; i < DownloadPaths.length; i++) {
      if (fs.existsSync(DownloadPaths[i])) fs.unlinkSync(DownloadPaths[i]);
    }
    return { Urls: resolvedUrls, filePath: filePath };
  }

  async filter(
    file: Express.Multer.File,
    ImgPath: string,
    bclasses: any,
  ): Promise<any> {
    let filePath = '';
    if (file) {
      filePath = file.path;
    } else if (ImgPath) {
      filePath = ImgPath;
    }

    let classes = [];

    if (file) {
      classes = bclasses.split(',');
    } else {
      classes = bclasses;
    }

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        timeout: 60000,
      });
      const page = await browser.newPage();
      await page.goto('https://newprofilepic.com');
      const fileInput = await page.$('input[type=file]');
      await fileInput.uploadFile(filePath);

      await page.waitForSelector(classes[0], {
        visible: true,
        timeout: 80000,
      });

      let timerPresent = true;
      while (timerPresent) {
        await page.waitForTimeout(1000); // wait for 1 second
        timerPresent = false;
        for (let i = 0; i < classes.length; i++) {
          const className = classes[i];
          await page.waitForSelector(`.${className}`);
          const button = await page.$(`.${className}`);
          const timer = await button.$('.timer-loader');
          if (timer) {
            timerPresent = true;
            break;
          }
        }
      }

      const Urls = [];
      for (let i = 0; i < classes.length; i++) {
        const className = classes[i];
        const button = await page.$(`.${className}`);
        const style = await button.getProperty('style');
        if (style) {
          const backgroundImage = await style.getProperty('backgroundImage');
          if (backgroundImage) {
            const urlHandle = (await backgroundImage.jsonValue()) as string;
            const url = urlHandle.slice(4, -1).replace(/"/g, '');
            if (!url.includes('assets.photo-cdn.net')) Urls.push(url);
          }
        }
      }
      await browser.close();

      return await this.Upload_to_S3(Urls, filePath);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async artWall(body: any): Promise<any> {
    const { ImgUrl, Width, Height } = body;
    const downloadPath = './tmp';
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath,
    });
    await page.goto('https://www.artheroes.com/en/WallApp/453');

    const filePath = `./tmp/${Date.now()}.jpg`;
    await downloadImage(ImgUrl, filePath);

    const fileInput = await page.$('input[type=file]');
    await fileInput.uploadFile(filePath);

    const Urls = [];
    const DownloadPaths = [];
    const classes = ['room-01', 'room-03', 'room-07'];

    for (let i = 0; i < classes.length; i++) {
      const className = classes[i];
      if (classes[i] != 'room-01') {
        await page.waitForSelector(`.${className}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await page.click(`.${className}`);
      }
      await page.waitForSelector('.ui-resizable');
      await page.click('.ui-resizable');
      await page.waitForSelector('.resizable.ui-resizable');

      await page.evaluate(
        (Width, Height) => {
          const resizableDiv = document.querySelector(
            '.resizable.ui-resizable',
          ) as HTMLElement;
          resizableDiv.style.width = Width;
          resizableDiv.style.height = Height;
        },
        Width,
        Height,
      );

      await page.waitForSelector('.btn-save');
      await page.click('.btn-save');

      const url = new Promise((resolve) => {
        page.on('response', (response) => {
          const disposition = response.headers()['content-disposition'];
          const filename = disposition?.split('=')[1]?.replace(/"/g, '');
          if (filename) {
            if (filename.includes('jpg')) {
              // loop until file is downloaded
              const interval = setInterval(async () => {
                DownloadPaths.push(`${downloadPath}/${filename}`);
                if (fs.existsSync(`${downloadPath}/${filename}`)) {
                  clearInterval(interval);
                  // upload file to s3 and return url
                  const s3 = new S3({
                    region: this.configService.get('file.awsS3Region'),
                    signatureVersion: 'v4',
                    credentials: {
                      accessKeyId: this.configService.get('file.accessKeyId'),
                      secretAccessKey: this.configService.get(
                        'file.secretAccessKey',
                      ),
                    },
                  });

                  const fileContent = fs.readFileSync(
                    `${downloadPath}/${filename}`,
                  );

                  const params = {
                    Bucket: this.configService.get('file.awsDefaultS3Bucket'),
                    Key: filename,
                    Body: fileContent,
                  };

                  await s3.upload(params).promise();
                  const url = await s3.getSignedUrlPromise('getObject', {
                    Bucket: params.Bucket,
                    Key: params.Key,
                    Expires: 3600,
                  });
                  resolve(url);
                }
              }, 1000);
            }
          }
        });
      });
      Urls.push(url);
    }
    // browser.close();

    const resolvedUrls = await Promise.all(Urls);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    for (let i = 0; i < DownloadPaths.length; i++) {
      if (fs.existsSync(DownloadPaths[i])) fs.unlinkSync(DownloadPaths[i]);
    }
    return resolvedUrls;
    // Return a promise that resolves with the S3 URL
  }
}
