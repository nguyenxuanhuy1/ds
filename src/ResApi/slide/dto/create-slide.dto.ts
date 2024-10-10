import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSlideDto {
  @IsString({ message: 'Loại sản phẩm cần phải là 1 chuỗi-[Slug]' })
  @IsNotEmpty({ message: 'Loại sản phẩm không được để trống-[Slug]' })
  @ApiProperty()
  slug?: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  href: string;
}
