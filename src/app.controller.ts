import { ConfigService } from '@nestjs/config';
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

interface EnvironmentVariables {
  PORT: number;
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService<EnvironmentVariables>,
  ) {}

  @Get()
  @Render('home')
  getHello() {
    return { message: 'Con Cac 1' + this.configService.get('PORT') };
  }
}
