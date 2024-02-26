import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export default class SignupDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birthday: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  role: string;
}
