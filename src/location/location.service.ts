import { Injectable } from '@nestjs/common';
import { LocationDto } from './dto/location.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LocationService {
  prisma = new PrismaClient();

  async getLocationList(): Promise<any> {
    try {
      const locationList = await this.prisma.viTri.findMany();
      return {
        status: 200,
        data: locationList,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async addLocation(locationDto: LocationDto): Promise<any> {
    try {
      const { tenViTri, tinhThanh, quocGia, hinhAnh } = locationDto;
      const newLocation = {
        ten_vi_tri: tenViTri,
        tinh_thanh: tinhThanh,
        quoc_gia: quocGia,
        hinh_anh: hinhAnh,
      };
      await this.prisma.viTri.create({
        data: newLocation,
      });
      return {
        status: 201,
        data: newLocation,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getPaginationList(page: number, size: number): Promise<any> {
    const numPage = Number(page);
    const numSize = Number(size);
    const skip = (numPage - 1) * numSize;
    try {
      const paginationList = await this.prisma.viTri.findMany({
        skip: skip,
        take: numSize,
      });
      return {
        status: 200,
        data: paginationList,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async getLocation(id: number): Promise<any> {
    try {
      const location = await this.prisma.viTri.findFirst({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        data: location,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async updateLocation(id: number, locationDto: LocationDto): Promise<any> {
    try {
      const { tenViTri, tinhThanh, quocGia, hinhAnh } = locationDto;
      const updatedLocation = {
        ten_vi_tri: tenViTri,
        tinh_thanh: tinhThanh,
        quoc_gia: quocGia,
        hinh_anh: hinhAnh,
      };
      await this.prisma.viTri.update({
        where: {
          id: id,
        },
        data: updatedLocation,
      });
      return {
        status: 200,
        data: updatedLocation,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async deleteLocation(id: number): Promise<any> {
    try {
      const deletedLocation = await this.prisma.viTri.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        data: deletedLocation,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}
