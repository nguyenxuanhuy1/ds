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
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const existingUser = await this.Repository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new BadRequestException('Tài khảon đã tồn tại!');
    }

    const newUser = this.Repository.create(createUserDto);
    return await this.Repository.save(newUser);
  }
}
