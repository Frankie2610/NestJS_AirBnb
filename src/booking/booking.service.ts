import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BookingService {
  prisma = new PrismaClient();

  create(createBookingDto: CreateBookingDto) {
    return 'This action adds a new booking';
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

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
