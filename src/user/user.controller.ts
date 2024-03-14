import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Res,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdatedUserDto } from './dto/updatedUser.dto';

@ApiTags('NguoiDung')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // tạo mới user
  @Post()
  async addUser(
    @Body() userDto: UserDto,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.userService.addUser(userDto, req);
    res.status(data.status).json(data);
  }

  // lấy user list
  @Get()
  async getUserList(@Res() res): Promise<any> {
    const data = await this.userService.getUserList();
    res.status(data.status).json(data);
  }

  // lấy user theo id
  @Get(':id')
  async getUser(@Param('id') id: number, @Res() res): Promise<any> {
    const data = await this.userService.getUser(+id);
    res.status(data.status).json(data);
  }

  // tìm kiếm theo tên
  @Get('/search/:tenNguoiDung')
  async searchUser(
    @Param('tenNguoiDung') tenNguoiDung: string,
    @Res() res,
  ): Promise<any> {
    const data = await this.userService.searchUser(tenNguoiDung);
    res.status(data.status).json(data);
  }

  // phân trang tìm kiếm
  @ApiParam({ name: 'page' })
  @ApiParam({ name: 'size' })
  @Get('/phan-trang-tim-kiem/:page/:size')
  async getPaginationList(
    @Param('page') page: number,
    @Param('size') size: number,
    @Res() res,
  ): Promise<any> {
    const data = await this.userService.getPaginationList(page, size);
    await res.status(data.status).json(data);
  }

  // xóa user theo id
  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.userService.deleteUser(+id, req);
    await res.status(data.status).json(data);
  }

  // update user
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updatedUserDto: UpdatedUserDto,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    const data = await this.userService.updateUser(+id, updatedUserDto, req);
    await res.status(data.status).json(data);
  }

  //upload avarar
  @Post('/upload-avatar')
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
  @ApiProperty({ type: 'string', format: 'binary' })
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file);
  }
}
