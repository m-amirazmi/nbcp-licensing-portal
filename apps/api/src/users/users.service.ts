import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async create({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role?: UserRole;
  }) {
    const user = new User();
    user.email = email;
    user.password = await this.hashPassword(password);
    user.role = role || ('applicant' as UserRole);
    const newUser = await this.repo.save(user);
    return { message: 'User created successfully', userId: newUser.id };
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    return user;
  }

  async findById(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
