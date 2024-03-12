import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import SigninDto from './dto/signin.dto';
import SignupDto from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();

  async signup(body: SignupDto): Promise<any> {
    const BCRYPT_FACTOR = 10;
    try {
      const { name, email, password, phone, birthday, gender, role } = body;
      const user = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });
      if (user) {
        return {
          status: 400,
          message: 'User existed',
        };
      }
      const encodePassword = bcrypt.hashSync(password, BCRYPT_FACTOR);
      const newUser = {
        name: name,
        email: email,
        pass_word: encodePassword,
        phone: phone,
        birth_day: birthday,
        gender: gender,
        role: role,
      };
      await this.prisma.nguoiDung.create({
        data: newUser,
      });
      return {
        status: 201,
        data: newUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

  async signin(body: SigninDto): Promise<any> {
    try {
      const { email, password } = body;
      const isUser = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });
      if (isUser) {
        const isPassword = bcrypt.compareSync(password, isUser.pass_word);
        if (isPassword) {
          const payload = {
            id: isUser.id,
            email: isUser.email,
            role: isUser.role,
          };
          const token = this.jwtService.sign(payload, {
            secret: this.configService.get('SECRET_KEY'),
            expiresIn: this.configService.get('EXPIRES_IN'),
          });
          return {
            status: 201,
            data: token,
          };
        }
        return {
          status: 400,
          message: 'Password incorrect',
        };
      }
      return {
        status: 400,
        message: 'User not found',
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}
