// src/auth/auth.controller.ts
import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login account and return a access token' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto.username);
  }
}
