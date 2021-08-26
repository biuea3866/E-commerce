import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogDto } from 'src/dto/catalog.dto';
import { CatalogEntity } from 'src/entity/catalog.entity';
import { ResponseCatalog } from 'src/vo/response.catalog';
import { Repository } from 'typeorm';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(CatalogEntity) private catalogRepository: Repository<CatalogEntity>,
        @Inject('catalog-service') private readonly client: ClientProxy    
    ) {}

    public async create(catalogDto: CatalogDto): Promise<ResponseCatalog> {
        try {
            const catalogEntity = new CatalogEntity();

            catalogEntity.productId = catalogDto.productId;
            catalogEntity.productName = catalogDto.productName;
            catalogEntity.stock = catalogDto.stock;
            catalogEntity.unitPrice = catalogDto.unitPrice;
            
            await this.catalogRepository.save(catalogEntity);
            
            const responseCatalog = new ResponseCatalog();

            responseCatalog.productId = catalogEntity.productId;
            responseCatalog.productName = catalogEntity.productName;
            responseCatalog.stock = catalogEntity.stock;
            responseCatalog.unitPrice = catalogEntity.unitPrice;
        
            return responseCatalog;
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
    
    public async getCatalog(productId: string): Promise<ResponseCatalog> {
        try {
            return await this.catalogRepository.findOne({ where: { productId: productId }});
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        } 
    }

    public async getCatalogs(): Promise<ResponseCatalog[]> {
        try {
            return await this.catalogRepository.find();
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        } 
    }

    public async updateCatalog(catalogDto: CatalogDto): Promise<ResponseCatalog> {
        try {
            const catalogEntity = await this.catalogRepository.findOne({ where: { productId: catalogDto.productId }});
            const responseCatalog = new ResponseCatalog();

            catalogEntity.stock = catalogDto.stock;
            catalogEntity.unitPrice = catalogDto.unitPrice;

            await this.catalogRepository.save(catalogEntity);
            
            responseCatalog.productId = catalogEntity.productId;
            responseCatalog.stock = catalogEntity.stock;
            responseCatalog.unitPrice = catalogEntity.unitPrice;

            return responseCatalog; 
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        } 
    }

    public async createOrderAndDecreaseStock(data: any): Promise<any> {
        const catalogEntity = await this.catalogRepository.findOne({ where: { productId: data.productId }});

        catalogEntity.stock -= data.qty;

        if(catalogEntity.stock < 0) {
            data.status = 'ERROR_ORDER';

            this.client.emit('ERROR_ORDER', data);
            
            catalogEntity.stock += data.qty;

            await this.catalogRepository.save(catalogEntity);
            
            return data.status + " : Product stock is less than 0";
        } else {
            await this.catalogRepository.save(catalogEntity);

            return catalogEntity;
        }
    }  

    public async cancelOrderAndRollbackStock(data: any): Promise<any> {
        const catalogEntity = await this.catalogRepository.findOne({ where: { productId: data.productId }});

        catalogEntity.stock += data.qty;

        await this.catalogRepository.save(catalogEntity);

        return "Successfully Rollback stock";
    }

    public async reOrderAndDecreaseStock(data: any): Promise<any> {
        const catalogEntity = await this.catalogRepository.findOne({ where: { productId: data.productId }});

        catalogEntity.stock -= data.qty;

        await this.catalogRepository.save(catalogEntity);

        return "Complete Reorder";
    }
}
