import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty()
  room: string;
  @ApiProperty()
  customer: number;
  @ApiProperty()
  bedRoom: number;
  @ApiProperty()
  bed: number;
  @ApiProperty()
  bathRoom: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  washingMachine: boolean;
  @ApiProperty()
  streamIron: boolean;
  @ApiProperty()
  tivi: boolean;
  @ApiProperty()
  airConditioner: boolean;
  @ApiProperty()
  wifi: boolean;
  @ApiProperty()
  kitchen: boolean;
  @ApiProperty()
  parking: boolean;
  @ApiProperty()
  pool: boolean;
  @ApiProperty()
  iron: boolean;
  @ApiProperty()
  photo: string;
}
