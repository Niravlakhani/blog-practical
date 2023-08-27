import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(blogData): Promise<Blog[]> {
    const newBlog = this.blogRepository.create(blogData);
    return this.blogRepository.save(newBlog);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  async getResourcesByEntity(fileName){
    const filePath = path.resolve(__dirname, `../../../uploads/${fileName}`);
    console.log('filePath',filePath)
    if (!fs.existsSync(filePath)) {
      return null;
    }
    return filePath;
  }
}
