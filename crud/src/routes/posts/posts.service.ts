import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostsService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(body: any, userId: number) {
    console.log(body);
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    });
  }

  findAll() {
    return this.prismaService.post.findMany()
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
