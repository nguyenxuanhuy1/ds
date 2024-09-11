import {
  Controller,
  Post,
  Res,
  Body,
  BadRequestException,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
@ApiTags('API-User')
@Controller('user')
export class UserController {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

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
    const checktrung = await this.userService.findOneByUsername(username);
    if (checktrung) {
      throw new BadRequestException('Tài khoản đã tồn tại');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    try {
      // Tạo người dùng thông qua userService
      const user = await this.userService.create({
        username,
        password: hashedPassword,
        gmail,
      });
      delete user.password;

      return user;
    } catch (error) {
      throw new BadRequestException('Registration failed: ' + error.message);
    }
  }

  // hàm login
  @Post('login')
  @ApiBody({
    description: 'Thông tin đăng nhập',
    type: CreateUserDto,
  })
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) respone: Response,
  ) {
    const user = await this.userService.findUsernameAndPass({
      where: { username: username },
    });
    console.log('username', user);

    if (!user) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu sai');
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu sai');
    }

    const jwt = await this.jwtService.signAsync(
      { userId: user.userId },
      { expiresIn: '30s' },
    );
    respone.cookie('jwt', jwt, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 1000,
    });
    return {
      acessToken: jwt,
    };
  }

  @Get('member')
  async user(@Req() request: Request): Promise<any> {
    try {
      const cookie = request.cookies['jwt'];

      if (!cookie) {
        throw new UnauthorizedException('Nào định làm gì cookie đâu');
      }
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException('JWT không hợp lệ hoặc đã hết hạn');
      }

      const user = await this.userService.findUsernameAndPass({
        where: { userId: data['userId'] },
      });

      if (!user) {
        throw new UnauthorizedException('Người dùng không tồn tại');
      }

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Đăng xuất thành công',
    };
  }
}
