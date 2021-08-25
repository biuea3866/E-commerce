import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://uotqkcgc:GWHwpSEej3eXigR41VjbiZwalO6r8pCI@cattle.rmq2.cloudamqp.com/uotqkcgc'],
        queue: 'ecommerce_queue',
        queueOptions: {
          durable: false,
        },
      },
    }, 
  );
  await app.listen();
}
bootstrap();
