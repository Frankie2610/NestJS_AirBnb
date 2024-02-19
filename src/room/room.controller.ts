import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Phong')
@Controller('phong-thue')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() roomDto: RoomDto, @Res() res): Promise<any> {
    const data = await this.roomService.createRoom(roomDto);
    res.status(data.status).json(data);
  }

  @Get()
  async getRoomList(@Res() res): Promise<any> {
    const data = await this.roomService.getRoomList();
    res.status(data.status).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
  //   return this.roomService.update(+id, updateRoomDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
