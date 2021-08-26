import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '10a10a',
      database: 'orders',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientsModule.register([{
      name: 'catalog-service',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://imgcjawe:4zfRldwf6YFJpnqWnqb6gwZhQtEtAVLd@cattle.rmq2.cloudamqp.com/imgcjawe'],
        queue: 'catalog_queue',
        queueOptions: {
          durable: false,
        },
      },
    }]),
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}