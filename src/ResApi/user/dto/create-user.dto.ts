import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
export class BaseUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'Tài khoản yêu cầu nhập >=6 kí tự' })
  @IsNotEmpty({ message: 'Tài khoản đang để trống' })
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'Mật khẩu yêu cầu nhập >=6 kí tự' })
  @IsNotEmpty({ message: 'Tài khoản không đúng' })
  password: string;
}
export class CreateUserDto extends BaseUserDto {
  @ApiProperty({ required: false })
  @IsEmail({}, { message: 'Yêu cầu nhập địa chỉ email hợp lệ' })
  @IsOptional()
  gmail?: string;
}
