import {
  Controller,
  Post,
  Res,
  Body,
  BadRequestException,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
import { LocalGuard } from './guards/local.guards';
import { jWTGuard } from './guards/jwt.guards';
@ApiTags('API-User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({
    description: 'Đăng kí tài khoản',
    type: CreateUserDto,
  })
  @Post('register')
  @ApiBody({
    description: 'Đăng kí tài khoản',
    type: CreateUserDto,
  })
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('gmail') gmail: string,
  ) {
    try {
      const user = await this.userService.register({
        username,
        password,
        gmail,
      });
      return user;
    } catch (error) {
      throw new BadRequestException(
        'Đăng ký không thành công: ' + error.message,
      );
    }
  }

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiBody({
    description: 'Thông tin đăng nhập',
    type: CreateUserDto,
  })
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { accessToken, cookieOptions } = await this.userService.login(
        username,
        password,
      );
      response.cookie('jwt', accessToken, cookieOptions);
      return { accessToken };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('member')
  @UseGuards(jWTGuard)
  async user(@Req() request: Request): Promise<any> {
    const cookie = request.cookies['jwt'];

    // Gọi tới service để kiểm tra JWT và lấy thông tin người dùng
    return await this.userService.getUserFromToken(cookie);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Đăng xuất thành công',
    };
  }
}
