import { Injectable, Req } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async addUser(userDto: UserDto, req: any): Promise<any> {
    const BCRYPT_FACTOR = 10;
    const { role } = req.user;
    if (role !== 'Admin' && role !== 'admin') {
      return {
        status: 400,
        message: 'Unauthorized!!',
      };
    }
    try {
      const { name, email, pass_word, phone, birth_day, gender, role } =
        userDto;
      const user = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });
      if (user) {
        return {
          status: 400,
          message: 'User existed',
        };
      }
      const encodePassword = bcrypt.hashSync(pass_word, BCRYPT_FACTOR);

      const newUser = {
        name: name,
        email: email,
        pass_word: encodePassword,
        phone: phone,
        birth_day: birth_day,
        gender: gender,
        role: role,
      };
      await this.prisma.nguoiDung.create({
        data: newUser,
      });
      return {
        status: 201,
        data: newUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
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
          name: {
            contains: tenNguoiDung,
          },
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

  async deleteUser(id: number, req: any): Promise<any> {
    try {
      const { role } = req.user;
      if (role !== 'Admin' && role !== 'admin') {
        return {
          status: 400,
          message: 'Unauthorized!!',
        };
      }
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

  async updateUser(id: number, userDto: UserDto, userId: number): Promise<any> {
    const BCRYPT_FACTOR = 10;

    if (id !== userId) {
      return {
        status: 400,
        message: 'Unauthorized!!',
      };
    }
    try {
      const { name, email, pass_word, phone, birth_day, gender, role } =
        userDto;

      const encodePassword = bcrypt.hashSync(pass_word, BCRYPT_FACTOR);

      const updatedUser = {
        name: name,
        email: email,
        pass_word: encodePassword,
        phone: phone,
        birth_day: birth_day,
        gender: gender,
        role: role,
      };
      await this.prisma.nguoiDung.update({
        where: {
          id: id,
        },
        data: updatedUser,
      });
      return {
        status: 200,
        data: updatedUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}
