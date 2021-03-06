import { Body, Controller, Get, Inject, Logger, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CatalogDto } from 'src/dto/catalog.dto';
import { RequestCreate } from 'src/vo/request.create';
import { RequestUpdate } from 'src/vo/request.update';
import { ResponseCatalog } from 'src/vo/response.catalog';
import { CatalogService } from './catalog.service';

@Controller('catalogs')
export class CatalogController {
    constructor(
        private readonly catalogService: CatalogService,
    ) {}

    @Get('health_check')
    public async status() {
        return await "It's working catalog-service";
    }

    @Post('create')
    public async create(@Body() requestCreate: RequestCreate) : Promise<ResponseCatalog> {
        const catalogDto = new CatalogDto();

        catalogDto.productId = requestCreate.productId;
        catalogDto.productName = requestCreate.productName;
        catalogDto.stock = requestCreate.stock;
        catalogDto.unitPrice = requestCreate.unitPrice;
        
        return await this.catalogService.create(catalogDto);
    }

    @Get(':productId')
    public async getCatalog(@Param('productId') productId: string): Promise<ResponseCatalog> {
        return await this.catalogService.getCatalog(productId);
    }

    @Get('')
    public async getCatalogs(): Promise<ResponseCatalog[]> {
        return await this.catalogService.getCatalogs();
    }

    @Patch(':productId')
    public async updateCatalog(
        @Param('productId') productId: string, 
        @Body() requestUpdate: RequestUpdate
    ): Promise<ResponseCatalog> {
        const catalogDto = new CatalogDto();

        catalogDto.productId = productId;
        catalogDto.stock = requestUpdate.stock;
        catalogDto.unitPrice = requestUpdate.unitPrice;

        return await this.catalogService.updateCatalog(catalogDto);
    }

    @EventPattern('CREATE_ORDER')
    public async createOrderAndDecreaseStock(data: any): Promise<any> {
        return await this.catalogService.createOrderAndDecreaseStock(data);
    }

    @EventPattern('CANCEL_ORDER')
    public async cancelOrderAndRollbackStock(data: any): Promise<any> {
        return await this.catalogService.cancelOrderAndRollbackStock(data);
    }

    @EventPattern('RE_ORDER')
    public async reOrderAndDecreaseStock(data: any): Promise<any> {
        return await this.catalogService.reOrderAndDecreaseStock(data);
    }
}
