import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BinhLuan')
@Controller('binh-luan')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // tạo mới bình luận
  @Post()
  async createComment(
    @Res() res,
    @Body() commentDto: CommentDto,
  ): Promise<any> {
    const data = await this.commentService.createComment(commentDto);
    res.status(data.status).json(data);
  }

  // Lấy danh sách bình luận
  @Get()
  async getCommentList(@Res() res): Promise<any> {
    const data = await this.commentService.getCommentList();
    res.status(data.status).json(data);
  }

  // Lấy bình luận theo mã phòng
  @Get('/lay-binh-luan-theo-phong/:maPhong')
  async getComment(
    @Param('maPhong') maPhong: number,
    @Res() res,
  ): Promise<any> {
    const data = await this.commentService.getComment(+maPhong);
    res.status(data.status).json(data);
  }

  // update bình luận
  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() commentDto: CommentDto,
    @Res() res,
  ) {
    const data = await this.commentService.updateComment(+id, commentDto);
    res.status(data.status).json(data);
  }

  // xóa bình luận
  @Delete(':id')
  async deleteComment(@Param('id') id: number, @Res() res): Promise<any> {
    const data = await this.commentService.deleteComment(+id);
    res.status(data.status).json(data);
  }
}
