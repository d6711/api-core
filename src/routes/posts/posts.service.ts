import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostsService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(body: any) {
    console.log(body);
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: 1
      }
    });
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
