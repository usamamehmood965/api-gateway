import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserServiceClient {
  findAll(data: {}): Observable<{ users: User[] }>;
}

// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// interface ProductServiceClient {
//   findAll(data: {}): Observable<{ products: Product[] }>;
// }

@Controller()
export class AppController implements OnModuleInit {
  private userService: UserServiceClient;
  // private productService: ProductServiceClient;

  constructor(
    @Inject('USER_PACKAGE') private readonly userClient: ClientGrpc,
    // @Inject('PRODUCT_PACKAGE') private readonly productClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService =
      this.userClient.getService<UserServiceClient>('UserService');
    // this.productService =
    //   this.productClient.getService<ProductServiceClient>('ProductService');
  }

  @Get('/users')
  getUsers() {
    return this.userService.findAll({});
  }

  // @Get('/products')
  // getProducts() {
  //   return this.productService.findAll({});
  // }
}
