import { Module } from '@nestjs/common';
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
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
