import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty()
  maPhong: number;
  @ApiProperty()
  ngayBinhLuan: Date;
  @ApiProperty()
  noiDung: string;
  @ApiProperty()
  saoBinhLuan: number;
}
