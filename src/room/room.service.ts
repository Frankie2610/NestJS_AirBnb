import { Injectable } from '@nestjs/common';
import { RoomDto } from './dto/room.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoomService {
  prisma = new PrismaClient();

  async createRoom(roomDto: RoomDto): Promise<any> {
    try {
      const {
        room,
        customer,
        bed,
        bedRoom,
        bathRoom,
        description,
        price,
        washingMachine,
        streamIron,
        tivi,
        airConditioner,
        wifi,
        kitchen,
        parking,
        pool,
        iron,
        photo,
      } = roomDto;
      const newRoom = {
        ten_phong: room,
        khach: customer,
        phong_ngu: bedRoom,
        giuong: bed,
        phong_tam: bathRoom,
        mo_ta: description,
        gia_tien: price,
        may_giat: washingMachine,
        ban_la: streamIron,
        tivi: tivi,
        dieu_hoa: airConditioner,
        wifi: wifi,
        bep: kitchen,
        do_xe: parking,
        ho_boi: pool,
        ban_ui: iron,
        hinh_anh: photo,
      };
      await this.prisma.phong.create({
        data: newRoom,
      });
      return {
        status: 201,
        data: newRoom,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getRoomList(): Promise<any> {
    try {
      const roomList = await this.prisma.phong.findMany();
      return {
        status: 200,
        data: roomList,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  // update(id: number, updateRoomDto: UpdateRoomDto) {
  //   return `This action updates a #${id} room`;
  // }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
