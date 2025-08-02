import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly repo: Repository<Application>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    userId: number,
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const user = await this.usersService.findById(userId);
    const application = this.repo.create({
      ...createApplicationDto,
      user,
    });
    return await this.repo.save(application);
  }
}
