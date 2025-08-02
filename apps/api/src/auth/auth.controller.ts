import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { AuthService } from './auth.service';
import { User, UserRole } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: { user: User }) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; role?: UserRole },
  ) {
    return await this.authService.register(
      body.email,
      body.password,
      body.role,
    );
  }
}
