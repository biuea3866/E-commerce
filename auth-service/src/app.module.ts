import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  // set mysql
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '10a10a',
      database: 'auth',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientsModule.register([
    {
      name: 'catalog-service',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://uotqkcgc:GWHwpSEej3eXigR41VjbiZwalO6r8pCI@cattle.rmq2.cloudamqp.com/uotqkcgc'],
        queue: 'ecommerce_queue',
        queueOptions: {
          durable: false
        },
      },
    }]),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}