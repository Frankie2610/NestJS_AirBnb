import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async getUserList(): Promise<any> {
    const userList = await this.prisma.nguoiDung.findMany();
    return {
      status: 200,
      data: userList,
    };
  }

  async getUser(id: number): Promise<any> {
    const user = await this.prisma.nguoiDung.findFirst({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      data: user,
    };
  }

  async searchUser(tenNguoiDung: string): Promise<any> {
    try {
      const userName = await this.prisma.nguoiDung.findMany({
        where: {
          name: tenNguoiDung,
        },
      });
      return {
        status: 200,
        data: userName,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getPaginationList(page: number, size: number): Promise<any> {
    try {
      const numPage = Number(page);
      const numSize = Number(size);
      const skip = (numPage - 1) * numSize;
      const data = await this.prisma.nguoiDung.findMany({
        skip: skip,
        take: numSize,
      });
      return {
        status: 200,
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async deleteUser(id: number): Promise<any> {
    try {
      const deletedComment = await this.prisma.binhLuan.deleteMany({
        where: {
          ma_nguoi_binh_luan: id,
        },
      });

      const deletedRoom = await this.prisma.datPhong.deleteMany({
        where: {
          ma_nguoi_dat: id,
        },
      });

      const deletedUser = await this.prisma.nguoiDung.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        message: 'User is deleted successfully',
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}
