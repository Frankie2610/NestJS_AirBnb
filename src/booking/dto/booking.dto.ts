import { ApiProperty } from '@nestjs/swagger';

export class BookingDto {
  @ApiProperty()
  maPhong: number;
  @ApiProperty()
  ngayDen: Date;
  @ApiProperty()
  ngayDi: Date;
  @ApiProperty()
  soLuongKhach: number;
  maNguoiDung: number;
}
