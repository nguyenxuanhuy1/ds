import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty()
  @IsString({ message: 'Nhập icon là thứ bạn muốn-[News]' })
  icon?: string;

  @IsString({ message: 'Text cần phải là 1 chuỗi-[News]' })
  @IsNotEmpty({ message: 'Text không được để trống-[News]' })
  @ApiProperty()
  text: string;

  @ApiProperty()
  href: string;
}
