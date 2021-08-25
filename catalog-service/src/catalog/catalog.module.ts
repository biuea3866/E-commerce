import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogEntity } from 'src/entity/catalog.entity';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogEntity])],
  controllers: [CatalogController],
  providers: [CatalogService]
})
export class CatalogModule {}
