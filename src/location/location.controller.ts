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
} from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiTags } from '@nestjs/swagger';
import { LocationDto } from './dto/location.dto';

@ApiTags('ViTri')
@Controller('vi-tri')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // lấy vị trí
  @Get()
  async getLocationList(@Res() res): Promise<any> {
    const data = await this.locationService.getLocationList();
    res.status(data.status).json(data);
  }

  // tạo vị trí mới
  @Post()
  async addLocation(
    @Body() locationDto: LocationDto,
    @Res() res,
  ): Promise<any> {
    const data = await this.locationService.addLocation(locationDto);
    res.status(data.status).json(data);
  }

  // tìm vị trí theo id
  @Get(':id')
  async getLocation(@Param('id') id: number, @Res() res) {
    const data = await this.locationService.getLocation(+id);
    res.status(data.status).json(data);
  }

  @Get('phan-trang-tim-kiem/:page/:size')
  async getPaginationList(
    @Param('page') page: number,
    @Param('size') size: number,
    @Res() res,
  ) {
    const data = await this.locationService.getPaginationList(page, size);
    res.status(data.status).json(data);
  }

  // update vị trí
  @Put(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() locationDto: LocationDto,
    @Res() res,
  ): Promise<any> {
    const data = await this.locationService.updateLocation(+id, locationDto);
    res.status(data.status).json(data);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: number, @Res() res): Promise<any> {
    const data = await this.locationService.deleteLocation(+id);
    res.status(data.status).json(data);
  }
}
