import { Injectable } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BookingService {
  prisma = new PrismaClient();

  async makeBooking(bookingDto: BookingDto, req): Promise<any> {
    try {
      const userId = +req.user.id;
      const { maPhong, ngayDen, ngayDi, soLuongKhach } = bookingDto;
      const newBooking = {
        ma_phong: maPhong,
        ngay_den: ngayDen,
        ngay_di: ngayDi,
        so_luong_khach: soLuongKhach,
        ma_nguoi_dat: userId,
      };

      // kiểm tra phòng user book có tồn tại hay không?
      const bookedRoom = await this.prisma.phong.findFirst({
        where: {
          id: maPhong,
        },
      });

      if (!bookedRoom) {
        return {
          status: 404,
          message: 'Room not existed!!',
        };
      }

      await this.prisma.datPhong.create({
        data: newBooking,
      });
      return {
        status: 201,
        data: newBooking,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getBookingList(): Promise<any> {
    try {
      const bookingList = await this.prisma.datPhong.findMany();
      return {
        status: 200,
        data: bookingList,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getBooking(id: number): Promise<any> {
    try {
      const booking = await this.prisma.datPhong.findFirst({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        data: booking,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getBookingBasedOnUser(maNguoiDung: number): Promise<any> {
    try {
      const booking = await this.prisma.datPhong.findMany({
        where: {
          ma_nguoi_dat: maNguoiDung,
        },
      });
      return {
        status: 200,
        data: booking,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async updateBooking(id: number, bookingDto: BookingDto, req: any) {
    try {
      const userId = +req.user.id;
      const booking = await this.prisma.datPhong.findFirst({
        where: {
          id: +id,
        },
      });
      //Kiểm tra user muốn update booking có phải là user tạo booking không?
      if (userId !== booking.ma_nguoi_dat) {
        return {
          status: 400,
          message: 'Unauthorized!!',
        };
      }
      const { maPhong, ngayDen, ngayDi, soLuongKhach } = bookingDto;
      const updatedBooking = {
        ma_phong: maPhong,
        ngay_den: ngayDen,
        ngay_di: ngayDi,
        so_luong_khach: soLuongKhach,
        ma_nguoi_dat: userId,
      };
      await this.prisma.datPhong.update({
        where: {
          id: id,
        },
        data: updatedBooking,
      });
      return {
        status: 200,
        data: updatedBooking,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async deleteBooking(id: number): Promise<any> {
    try {
      const isBooking = await this.prisma.datPhong.findFirst({
        where: {
          id: id,
        },
      });

      // kiểm tra booking muốn hủy/xóa có tồn tại?
      if (!isBooking) {
        return {
          status: 404,
          message: 'Booking not found',
        };
      }

      const deletedBooking = await this.prisma.datPhong.delete({
        where: {
          id: id,
        },
      });

      return {
        status: 200,
        data: deletedBooking,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}
