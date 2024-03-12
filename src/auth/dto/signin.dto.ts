import { ApiProperty } from '@nestjs/swagger';

export default class SigninDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
