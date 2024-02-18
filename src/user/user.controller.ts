import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('NguoiDung')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // tạo mới user
  @Post('/add-user')
  async addUser(@Body() userDto: UserDto, @Res() res): Promise<any> {
    const data = await this.userService.addUser(userDto);
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
    await res.status(data.status).json(data);
  }

  // phân trang tìm kiếm
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
  async deleteUser(@Param('id') id: number, @Res() res): Promise<any> {
    const data = await this.userService.deleteUser(+id);
    await res.status(data.status).json(data);
  }
  // update user
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userDto: UserDto,
    @Res() res,
  ): Promise<any> {
    const data = await this.userService.updateUser(+id, userDto);
    await res.status(data.status).json(data);
  }
}
