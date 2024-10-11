import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateBannerDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString({ message: 'Loại sản phẩm cần phải là 1 chuỗi-[Slug]' })
  @IsNotEmpty({ message: 'Loại sản phẩm không được để trống-[Slug]' })
  @ApiProperty()
  slug?: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  href: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number = 10;

  @ApiProperty({ required: false })
  openInNewTab?: boolean;
}
export class SearchBannerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number = 10;
}
