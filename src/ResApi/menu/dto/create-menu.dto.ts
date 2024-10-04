import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty()
  icon: string;

  @IsString({ message: 'Text cần phải là 1 chuỗi-[Menu]' })
  @IsNotEmpty({ message: 'Text không được để trống-[Menu]' })
  @ApiProperty()
  text: string;

  @ApiProperty()
  href: string;
}
