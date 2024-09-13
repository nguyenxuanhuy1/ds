import {
  Controller,
  Post,
  Res,
  Body,
  BadRequestException,
  Get,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BaseUserDto, CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
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
  async register(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    try {
      const { username, password, gmail } = createUserDto;
      const user = await this.userService.register({
        username,
        password,
        gmail,
      });
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  @ApiBody({
    description: 'Thông tin đăng nhập',
    type: BaseUserDto,
  })
  async login(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    loginUserDto: BaseUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { username, password } = loginUserDto;
    return this.localGuardLogin(username, password, response);
  }

  async localGuardLogin(
    username: string,
    password: string,
    response: Response,
  ) {
    const { accessToken, cookieOptions } = await this.userService.login(
      username,
      password,
    );
    response.cookie('jwt', accessToken, cookieOptions);
    return { accessToken };
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
