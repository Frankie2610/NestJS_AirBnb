import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('Phong')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('phong-thue')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // lấy danh sách phòng
  @Get()
  async getRoomList(@Res() res): Promise<any> {
    const data = await this.roomService.getRoomList();
    res.status(data.status).json(data);
  }

  // tạo phòng thuê
  @Post()
  async createRoom(
    @Body() roomDto: RoomDto,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.roomService.createRoom(roomDto, req);
    res.status(data.status).json(data);
  }

  // lấy phòng theo vị trí
  @ApiQuery({ name: 'maViTri' })
  @Get('/lay-phong-theo-vi-tri')
  async getRoomBaseOnLocation(
    @Query('maViTri') id: number,
    @Res() res,
  ): Promise<any> {
    const data = await this.roomService.getRoomBaseOnLocation(+id);
    res.status(data.status).json(data);
  }

  // lấy danh sách phòng phân trang tìm kiếm
  @ApiParam({ name: 'page' })
  @ApiParam({ name: 'size' })
  @ApiQuery({ name: 'keyword', required: false })
  @Get('/phan-trang-tim-kiem/:page/:size')
  async getPaginationList(
    @Param('page') page: number,
    @Param('size') size: number,
    @Query('keyword') keyword: string,
    @Res() res,
  ): Promise<any> {
    const data = await this.roomService.getPaginationList(page, size, keyword);
    res.status(data.status).json(data);
  }

  // lấy tên phòng theo id
  @Get(':id')
  async getRoom(@Param('id') id: number, @Res() res): Promise<any> {
    const data = await this.roomService.getRoom(+id);
    res.status(data.status).json(data);
  }

  // update phòng
  @Put(':id')
  async updateRoom(
    @Param('id') id: number,
    @Body() roomDto: RoomDto,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.roomService.updateRoom(+id, roomDto, req);
    res.status(data.status).json(data);
  }

  // delete phòng thuê
  @Delete(':id')
  async deleteRoom(
    @Param('id') id: string,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.roomService.deleteRoom(+id, req);
    res.status(data.status).json(data);
  }

  //upload hình phòng
  @Post('/upload-hinh-phong')
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
