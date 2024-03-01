import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
