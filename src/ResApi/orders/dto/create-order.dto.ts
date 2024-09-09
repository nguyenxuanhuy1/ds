import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  totalAmount: number; // Tổng tiền của Order

  @ApiProperty({ enum: ['pending', 'processing', 'completed', 'canceled'] })
  @IsEnum(['pending', 'processing', 'completed', 'canceled'])
  status: string; // Trạng thái của Order

  @ApiProperty()
  @IsString()
  paymentMethod: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  trackingNumber?: string;
}
