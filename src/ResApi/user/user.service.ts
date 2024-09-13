import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private Repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, gmail } = createUserDto;

    const checktrung = await this.findOneByUsername(username);
    if (checktrung) {
      throw new BadRequestException('Tài khoản đã tồn tại');
    }
    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.gmail = gmail;

    return await this.Repository.save(user);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; cookieOptions: any }> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu sai');
    }
    const accessToken = await this.jwtService.signAsync(
      { userId: user.userId },
      { expiresIn: '1h' },
    );

    const cookieOptions = {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 giờ
      // secure: process.env.NODE_ENV === 'production',
    };

    return { accessToken, cookieOptions };
  }
  async getUserFromToken(token: string): Promise<any> {
    try {
      if (!token) {
        throw new UnauthorizedException('Cookie không có JWT');
      }

      // Xác minh JWT
      const data = await this.jwtService.verifyAsync(token);
      if (!data) {
        throw new UnauthorizedException('JWT không hợp lệ hoặc đã hết hạn');
      }

      // Tìm người dùng dựa trên userId từ JWT
      const user = await this.Repository.findOne({
        where: { userId: data.userId },
      });
      if (!user) {
        throw new UnauthorizedException('Người dùng không tồn tại');
      }

      // Loại bỏ trường mật khẩu trước khi trả về thông tin người dùng
      const { password, role, createdAt, updatedAt, ...result } = user;

      return {
        ...result,
        iat: data.iat,
        exp: data.exp,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.Repository.findOne({
      where: { username: username },
    });
  }

  async findUsernameAndPass(condition: any): Promise<User> {
    return this.Repository.findOne(condition);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findUsernameAndPass({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
