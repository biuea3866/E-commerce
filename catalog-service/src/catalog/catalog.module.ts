import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogEntity } from 'src/entity/catalog.entity';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogEntity]),
    ClientsModule.register([{
      name: 'catalog-service',
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
  controllers: [CatalogController],
  providers: [CatalogService]
})
export class CatalogModule {}
