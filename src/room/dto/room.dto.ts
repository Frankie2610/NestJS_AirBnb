import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty()
  tenPhong: string;
  @ApiProperty()
  khach: number;
  @ApiProperty()
  phongNgu: number;
  @ApiProperty()
  giuong: number;
  @ApiProperty()
  phongTam: number;
  @ApiProperty()
  moTa: string;
  @ApiProperty()
  giaTien: number;
  @ApiProperty()
  mayGiat: boolean;
  @ApiProperty()
  banLa: boolean;
  @ApiProperty()
  tivi: boolean;
  @ApiProperty()
  dieuHoa: boolean;
  @ApiProperty()
  wifi: boolean;
  @ApiProperty()
  bep: boolean;
  @ApiProperty()
  doXe: boolean;
  @ApiProperty()
  hoBoi: boolean;
  @ApiProperty()
  banUi: boolean;
  @ApiProperty()
  hinhAnh: string;
}
