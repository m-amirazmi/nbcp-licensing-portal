import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { JwtAuthGuard } from 'src/auth/passport/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { ApplicationsService } from './applications.service';
import { CurrentUser } from 'src/_common/decorators/current-user.decorator';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.APPLICANT)
  @Post()
  async create(
    @CurrentUser() user: { id: number; email: string; role: UserRole },
    @Body() dto: CreateApplicationDto,
  ) {
    return this.applicationsService.create(user.id, dto);
  }
}
