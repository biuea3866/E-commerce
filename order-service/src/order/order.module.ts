import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
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
    }])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
