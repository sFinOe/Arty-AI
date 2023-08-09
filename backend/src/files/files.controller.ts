import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Response as NestResponse,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from './files.service';
import { ImageStylerService } from 'src/image-styler/image-styler.service';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload-nojwt')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileNoJwt(
    @Req() request: Request,
    @Res() response: Response,
    @UploadedFile() file: Express.Multer.File | Express.MulterS3.File,
  ) {
    // take the file
    this.filesService.uploadFile(file);
    const imageStylerService = new ImageStylerService();
    const result = await imageStylerService.styleImage(file, request, response);
    response.json({
      styles: result,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File | Express.MulterS3.File,
  ) {
    return this.filesService.uploadFile(file);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('signed-url')
  async getSignedUrl(@Body() body) {
    return this.filesService.generateSignedUrl(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AuthGuard('guest_jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './tmp',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          return callback(null, filename);
        },
      }),
    }),
  )
  @Post('filter')
  async Filter(@UploadedFile() file: Express.Multer.File, @Body() Body) {
    return this.filesService.filter(file, Body.ImgPath, Body.classes);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AuthGuard('guest_jwt'))
  @Post('art-wall')
  async ArtWall(@Body() Body) {
    return this.filesService.artWall(Body);
  }

  @Get(':path')
  download(@Param('path') path, @NestResponse() response) {
    return response.sendFile(path, { root: './files' });
  }
}
