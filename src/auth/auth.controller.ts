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
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import SigninDto from './dto/signin.dto';
import SignupDto from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: SignupDto, @Res() res): Promise<any> {
    const data = await this.authService.signup(body);
    res.status(data.status).json(data);
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto, @Res() res): Promise<any> {
    const data = await this.authService.signin(body);
    res.status(data.status).json(data);
  }
}
