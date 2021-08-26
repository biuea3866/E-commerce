import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://imgcjawe:4zfRldwf6YFJpnqWnqb6gwZhQtEtAVLd@cattle.rmq2.cloudamqp.com/imgcjawe'],
      queue: 'catalog_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(7200);
}
bootstrap();