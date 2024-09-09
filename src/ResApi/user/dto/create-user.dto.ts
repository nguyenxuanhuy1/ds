import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'Yêu cầu nhập >=6 kí tự' })
  @IsNotEmpty({ message: 'Tài khoản không được để trống' })
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'Yêu cầu nhập >=6 kí tự' })
  @IsNotEmpty({ message: 'Tài khoản không được để trống' })
  password: string;

  @ApiProperty()
  @MinLength(6, { message: 'Yêu cầu nhập >=6 kí tự' })
  gmail?: string;
}
