import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/hello')
  goToHello(req,res): any{
    console.log(req,res);
    return {
      name: "Krishna",
    }
  }
}
