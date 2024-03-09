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
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { LocationDto } from './dto/location.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('ViTri')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('vi-tri')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private cloudinaryService: CloudinaryService,
  ) {}

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
    @Req() req,
  ): Promise<any> {
    const data = await this.locationService.addLocation(locationDto, req);
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
    @Req() req,
  ): Promise<any> {
    const data = await this.locationService.updateLocation(
      +id,
      locationDto,
      req,
    );
    res.status(data.status).json(data);
  }

  @Delete(':id')
  async deleteLocation(
    @Param('id') id: number,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.locationService.deleteLocation(+id, req);
    res.status(data.status).json(data);
  }

  //upload avarar
  @Post('/upload-hinh-vitri')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const role = req.user.role;
    // kiểm tra xem có phải admin không?
    if (role !== 'admin' && role !== 'Admin') {
      return {
        status: 400,
        message: 'Unauthorized!',
      };
    }
    return this.cloudinaryService.uploadImage(file);
  }
}
