import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  slug: string;

  // @ApiProperty()
  // @IsString()
  // slugType: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  originalPrice: number;
}
