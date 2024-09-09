import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private Repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, gmail } = createUserDto;
    const user = new User();
    user.username = username;
    user.password = password;
    if (gmail) {
      user.gmail = gmail;
    }

    return await this.Repository.save(user);
  }
  async findOneByUsername(username: string): Promise<User | null> {
    return await this.Repository.findOne({
      where: { username: username },
    });
  }

  async findUsernameAndPass(condition: any): Promise<User> {
    return this.Repository.findOne(condition);
  }
}
