import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  pass_word: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birth_day: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  role: string;
}
