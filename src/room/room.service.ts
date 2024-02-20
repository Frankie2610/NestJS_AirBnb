import { Injectable } from '@nestjs/common';
import { RoomDto } from './dto/room.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoomService {
  prisma = new PrismaClient();

  async createRoom(roomDto: RoomDto): Promise<any> {
    try {
      const {
        tenPhong,
        khach,
        phongNgu,
        giuong,
        phongTam,
        moTa,
        giaTien,
        mayGiat,
        banLa,
        tivi,
        dieuHoa,
        wifi,
        bep,
        doXe,
        hoBoi,
        banUi,
        hinhAnh,
      } = roomDto;
      const newRoom = {
        ten_phong: tenPhong,
        khach: khach,
        phong_ngu: phongNgu,
        giuong: giuong,
        phong_tam: phongTam,
        mo_ta: moTa,
        gia_tien: giaTien,
        may_giat: mayGiat,
        ban_la: banLa,
        tivi: tivi,
        dieu_hoa: dieuHoa,
        wifi: wifi,
        bep: bep,
        do_xe: doXe,
        ho_boi: hoBoi,
        ban_ui: banUi,
        hinh_anh: hinhAnh,
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

  async getRoom(id: number): Promise<any> {
    try {
      const room = await this.prisma.phong.findFirst({
        where: {
          id: id,
        },
      });
      if (!room) {
        return {
          status: 404,
          message: 'This room not found!!',
        };
      }
      return {
        status: 200,
        data: room,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async updateRoom(id: number, roomDto: RoomDto): Promise<any> {
    try {
      const {
        tenPhong,
        khach,
        phongNgu,
        giuong,
        phongTam,
        moTa,
        giaTien,
        mayGiat,
        banLa,
        tivi,
        dieuHoa,
        wifi,
        bep,
        doXe,
        hoBoi,
        banUi,
        hinhAnh,
      } = roomDto;
      const updatedRoom = {
        ten_phong: tenPhong,
        khach: khach,
        phong_ngu: phongNgu,
        giuong: giuong,
        phong_tam: phongTam,
        mo_ta: moTa,
        gia_tien: giaTien,
        may_giat: mayGiat,
        ban_la: banLa,
        tivi: tivi,
        dieu_hoa: dieuHoa,
        wifi: wifi,
        bep: bep,
        do_xe: doXe,
        ho_boi: hoBoi,
        ban_ui: banUi,
        hinh_anh: hinhAnh,
      };
      await this.prisma.phong.update({
        where: {
          id: id,
        },
        data: updatedRoom,
      });
      return {
        status: 200,
        data: updatedRoom,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async deleteRoom(id: number): Promise<any> {
    try {
      const deletedRoom = await this.prisma.phong.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        data: deletedRoom,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getPaginationList(page, size): Promise<any> {
    try {
      const numPage = Number(page);
      const numSize = Number(size);
      const skip = (numPage - 1) * numSize;
      const roomList = await this.prisma.phong.findMany({
        skip: skip,
        take: numSize,
      });
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

  async getRoomBaseOnLocation(maViTri: number): Promise<any> {
    try {
      console.log(maViTri);

      const room = await this.prisma.phong.findMany({
        where: {
          ma_vi_tri: +maViTri,
        },
      });
      return {
        status: 200,
        data: room,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}
