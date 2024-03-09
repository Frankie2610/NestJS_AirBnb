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
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('DatPhong')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('dat-phong')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // lấy danh sách đặt phòng
  @Get()
  async getBookingList(@Res() res): Promise<any> {
    const data = await this.bookingService.getBookingList();
    res.status(data.status).json(data);
  }

  // lấy danh sách đặt phòng theo id
  @Get(':id')
  async getBooking(@Param('id') id: number, @Res() res): Promise<any> {
    const data = await this.bookingService.getBooking(+id);
    res.status(data.status).json(data);
  }

  // lấy danh sách đặt phòng theo người dùng
  @Get('/lay-theo-nguoi-dung/:maNguoiDung')
  async getBookingBasedOnUser(
    @Param('maNguoiDung') maNguoiDung: number,
    @Res() res,
  ): Promise<any> {
    const data = await this.bookingService.getBookingBasedOnUser(+maNguoiDung);
    res.status(data.status).json(data);
  }

  // tạo booking
  @Post()
  async makeBooking(
    @Body() bookingDto: BookingDto,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.bookingService.makeBooking(bookingDto, req);
    res.status(data.status).json(data);
  }

  // update đặt phòng
  @Put(':id')
  async updateBooking(
    @Param('id') id: number,
    @Body() bookingDto: BookingDto,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.bookingService.updateBooking(+id, bookingDto, req);
    res.status(data.status).json(data);
  }

  // Xóa đặt phòng
  @Delete(':id')
  async deleteBooking(@Param('id') id: number, @Res() res): Promise<any> {
    const data = await this.bookingService.deleteBooking(+id);
    res.status(data.status).json(data);
  }
}
