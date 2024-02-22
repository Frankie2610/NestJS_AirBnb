import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  async createComment(commentDto: CommentDto): Promise<any> {
    try {
      const { maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan } =
        commentDto;
      const newComment = {
        ma_phong: maPhong,
        ma_nguoi_binh_luan: maNguoiBinhLuan,
        ngay_binh_luan: ngayBinhLuan,
        noidung: noiDung,
        sao_binh_luan: saoBinhLuan,
      };

      await this.prisma.binhLuan.create({
        data: newComment,
      });
      return {
        status: 201,
        data: newComment,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getCommentList(): Promise<any> {
    try {
      const commentList = await this.prisma.binhLuan.findMany();
      return {
        status: 200,
        data: commentList,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getComment(maPhong: number): Promise<any> {
    try {
      const comment = await this.prisma.binhLuan.findMany({
        where: {
          ma_phong: maPhong,
        },
      });
      return {
        status: 200,
        data: comment,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async updateComment(id: number, commentDto: CommentDto) {
    try {
      const { maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan } =
        commentDto;
      const updatedComment = {
        ma_phong: maPhong,
        ma_nguoi_binh_luan: maNguoiBinhLuan,
        ngay_binh_luan: ngayBinhLuan,
        noidung: noiDung,
        sao_binh_luan: saoBinhLuan,
      };

      await this.prisma.binhLuan.update({
        where: {
          id: id,
        },
        data: updatedComment,
      });
      return {
        status: 201,
        data: updatedComment,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async deleteComment(id: number): Promise<any> {
    try {
      const isComment = await this.prisma.binhLuan.findUnique({
        where: {
          id: id,
        },
      });

      // kiểm tra comment xóa có tồn tại hay không?
      if (!isComment) {
        return {
          status: 404,
          message: 'Comment not found',
        };
      }

      const deletedComment = await this.prisma.binhLuan.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        data: deletedComment,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}
