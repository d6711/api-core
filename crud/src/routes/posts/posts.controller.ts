import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constant';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }
  @Auth([AuthType.Bearer, AuthType.ApiKey], { condition: ConditionGuard.And })
  @Post()
  create(@Body() body: any, @ActiveUser('userId') userId: number) {
    return this.postsService.create(body, userId);
  }
  @Auth([AuthType.Bearer, AuthType.ApiKey], { condition: ConditionGuard.And })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
