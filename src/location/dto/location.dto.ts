import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty()
  tenViTri: string;
  @ApiProperty()
  tinhThanh: string;
  @ApiProperty()
  quocGia: string;
  @ApiProperty()
  hinhAnh: string;
}
