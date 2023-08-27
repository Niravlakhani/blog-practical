import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file, @Body() body) {
    return this.blogService.create({
      title: body.title,
      description: body.description,
      image: file.filename,
    });
  }

  @Get('/all-blogs')
  findAll() {
    return this.blogService.findAll();
  }

  @Get('/getResourcesByEntity/:fileName')
  async getResourcesByEntity(@Param('fileName') fileName: string, @Res() res) {
    await this.blogService.getResourcesByEntity(fileName).then((filePath) => {
      if (filePath) {
        return res.status(200).sendFile(filePath);
      }
      return res.status(404).json({
        statusCode: 404,
        message: 'File Not Found',
      });
    });
  }
}
