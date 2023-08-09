import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { Request, Response } from 'express';

const getImgs = async (page) => {
  console.log('getImgs');
  const imgURls = [];
  const buttons = await page.$$('.creative-tabs button');

  // let i = 0;
  for (let button of buttons) {
    // if (i++ > 1) {
    //     break;
    // }
    await button.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('.creative-download', { visible: true });
    const divOfImg = await page.$('.creative');
    // get the img element inside the divOfImg, get the src attribute of the img element
    const imageUrl = await divOfImg.$eval('img', (img) => img.src);
    imgURls.push(imageUrl);
  }
  return imgURls;
};

@Injectable()
export class ImageStylerService {
  async styleImage(
    image: Express.Multer.File | Express.MulterS3.File,
    request: Request,
    response: Response,
  ) {
    const browser = await puppeteer.launch({
      headless: 'new',
      // executablePath: '/usr/bin/chromium-browser',
      // args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
    );
    await page.goto('https://newprofilepic.com/');
    await page.waitForTimeout(3000);
    const fileInput = await page.$('input[type=file]');
    await fileInput.uploadFile(image.path);
    await page.waitForSelector('.creative-download', { visible: true });

    let imgURLS = [];
    await page.waitForTimeout(1000);
    imgURLS = await getImgs(page);

    await browser.close();
    return imgURLS;
  }

  async getStyles() {
    // getting styles from the database
  }
}
