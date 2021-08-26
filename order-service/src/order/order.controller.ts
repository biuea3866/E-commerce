import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { OrderDto } from 'src/dto/order.dto';
import { RequestCreate } from 'src/vo/request.create';
import { RequestUpdate } from 'src/vo/request.update';
import { ResponseOrder } from 'src/vo/response.order';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService,) {}

    @Get('health_check')
    public async status() {
        return await "It's working order-service";
    }

    @Post('create')
    public async create(@Body() requestCreate: RequestCreate) : Promise<ResponseOrder> {
        const orderDto = new OrderDto();

        orderDto.productId = requestCreate.productId;
        orderDto.productName = requestCreate.productName;
        orderDto.qty = requestCreate.qty;
        orderDto.unitPrice = requestCreate.unitPrice;
        orderDto.totalPrice = (Number(requestCreate.qty) * Number(requestCreate.unitPrice));
        orderDto.userId = requestCreate.userId;

        return await this.orderService.create(orderDto);
    }

    @Get(':orderId')
    public async getOrder(@Param('orderId') orderId: string): Promise<ResponseOrder> {
        return await this.orderService.getOrder(orderId);
    }

    @Get(':userId/getOrder')
    public async getOrdersByUserId(@Param('userId') userId: string): Promise<ResponseOrder[]> {
        return await this.orderService.getOrdersByUserId(userId);
    }

    @Patch(':orderId')
    public async updateOrder(
        @Param('orderId') orderId: string, 
        @Body() requestUpdate: RequestUpdate
    ): Promise<ResponseOrder> {
        const orderDto = new OrderDto();

        orderDto.orderId = orderId;
        orderDto.qty = requestUpdate.qty;

        return await this.orderService.updateOrder(orderDto);
    }

    @Post(':orderId/cancel')
    public async cancelOrder(@Param('orderId') orderId: string): Promise<ResponseOrder> {
        return await this.orderService.cancelOrder(orderId);
    }

    @Post(':orderId/reorder')
    public async reOrder(@Param('orderId') orderId: string) {
        return await this.orderService.reOrder(orderId);
    }

    @EventPattern('ERROR_ORDER')
    public async errorOrder(data: any) {
        return await this.orderService.errorOrder(data);
    }
}
