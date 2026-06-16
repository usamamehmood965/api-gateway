import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  // imports: [],
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'USER_SERVICE',
    //     transport: Transport.TCP,
    //     options: {
    //       host: 'user-service',
    //       port: 3001,
    //     },
    //   },
    //   {
    //     name: 'PRODUCT_SERVICE',
    //     transport: Transport.TCP,
    //     options: {
    //       host: 'product-service',
    //       port: 3002,
    //     },
    //   },
    // ]),

    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../proto/user.proto'),
          url: 'user-service:50051',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
