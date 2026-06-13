import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

/* @Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
 */

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE')
    private userClient: ClientProxy,

    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy,
  ) {}

  @Get('/users')
  getUsers() {
    return this.userClient.send('get_users', {});
  }

  @Get('/products')
  getProducts() {
    return this.productClient.send('get_products', {});
  }
}
