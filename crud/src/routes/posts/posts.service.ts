import { Injectable } from '@nestjs/common';
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

  getPosts(userId: number) {
    return this.prismaService.post.findMany({
      where: {
        authorId: userId
      },
      include: {
        author: {
          omit: {
            password: true
          }
        }
      }
    })
  }


  findOne(id: number) {
    return `This action returns a #${id} post`;
  }


  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
