import { ApiProperty } from '@nestjs/swagger';

export class UpdatedUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  pass_word: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birth_day: string;
  @ApiProperty()
  gender: string;
}
