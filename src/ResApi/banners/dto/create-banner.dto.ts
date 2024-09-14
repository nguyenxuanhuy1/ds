import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  slug: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  href: string;

  @ApiProperty({ required: false })
  openInNewTab?: boolean;
}
