import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('BinhLuan')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('binh-luan')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Lấy danh sách bình luận
  @Get()
  async getCommentList(@Res() res): Promise<any> {
    const data = await this.commentService.getCommentList();
    res.status(data.status).json(data);
  }

  // tạo mới bình luận
  @Post()
  async createComment(
    @Res() res,
    @Body() commentDto: CommentDto,
    @Req() req,
  ): Promise<any> {
    const data = await this.commentService.createComment(commentDto, req);
    res.status(data.status).json(data);
  }

  // update bình luận
  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() commentDto: CommentDto,
    @Res() res,
    @Req() req,
  ) {
    const data = await this.commentService.updateComment(+id, commentDto, req);
    res.status(data.status).json(data);
  }

  // xóa bình luận
  @Delete(':id')
  async deleteComment(
    @Param('id') id: number,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.commentService.deleteComment(+id, req);
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
}
