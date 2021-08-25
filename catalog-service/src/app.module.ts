import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '10a10a',
      database: 'catalog',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientsModule.register([{
      name: 'order-service',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://uotqkcgc:GWHwpSEej3eXigR41VjbiZwalO6r8pCI@cattle.rmq2.cloudamqp.com/uotqkcgc'],
        queue: 'ecommerce_queue',
        queueOptions: {
          durable: false
        },
      },
    }]),
    CatalogModule
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
