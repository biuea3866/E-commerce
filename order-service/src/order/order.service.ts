import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'src/dto/order.dto';
import { OrderEntity } from 'src/entity/order.entity';
import { ResponseOrder } from 'src/vo/response.order';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
        @Inject('order-service') private readonly client: ClientProxy    
    ) {}

    public async create(orderDto: OrderDto): Promise<ResponseOrder> {
        try {
            const orderEntity = new OrderEntity();

            orderEntity.orderId = uuid();
            orderEntity.productId = orderDto.productId;
            orderEntity.productName = orderDto.productName;
            orderEntity.qty = orderDto.qty;
            orderEntity.unitPrice = orderDto.unitPrice;
            orderEntity.totalPrice = orderDto.totalPrice;
            orderEntity.userId = orderDto.userId;
            orderEntity.status = 'CREATE_ORDER';

            this.client.emit('CREATE_ORDER', orderEntity);
            
            await this.orderRepository.save(orderEntity);
            
            const responseOrder = new ResponseOrder();

            responseOrder.orderId = orderEntity.orderId;
            responseOrder.productId = orderEntity.productId;
            responseOrder.productName = orderEntity.productName;
            responseOrder.qty = orderEntity.qty;
            responseOrder.unitPrice = orderEntity.unitPrice;
            responseOrder.totalPrice = orderEntity.totalPrice;
            responseOrder.userId = orderEntity.userId;
            responseOrder.status = orderEntity.status;

            return responseOrder;
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
    
    public async getOrder(orderId: string): Promise<ResponseOrder> {
        try {
            return await this.orderRepository.findOne({ where: { orderId: orderId }});
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        } 
    }

    public async getOrdersByUserId(userId: string): Promise<ResponseOrder[]> {
        try {
            return await this.orderRepository.find({ where: { userId: userId }});
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        } 
    }

    public async updateOrder(orderDto: OrderDto): Promise<ResponseOrder> {
        try {
            const orderEntity = await this.orderRepository.findOne({ where: { orderId: orderDto.orderId }});
            const responseOrder = new ResponseOrder();

            orderEntity.qty = orderDto.qty;
            orderEntity.totalPrice = (Number(orderDto.qty) * Number(orderEntity.unitPrice));
        
            await this.orderRepository.save(orderEntity);
            
            responseOrder.orderId = orderEntity.orderId;
            responseOrder.productName = orderEntity.productName;
            responseOrder.qty = orderEntity.qty;
            responseOrder.unitPrice = orderEntity.unitPrice;
            responseOrder.totalPrice = orderEntity.totalPrice;

            return responseOrder; 
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        } 
    }

    public async cancelOrder(orderId: string): Promise<ResponseOrder> {
        try {
            const orderEntity = await this.orderRepository.findOne({ where: { orderId: orderId }});
            const responseOrder = new ResponseOrder();
            
            orderEntity.status = 'CANCEL_ORDER';

            await this.orderRepository.save(orderEntity);
            
            this.client.emit('CANCEL_ORDER', orderEntity);

            responseOrder.orderId = orderEntity.orderId;
            responseOrder.status = orderEntity.status;

            return responseOrder;
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async reOrder(orderDto: OrderDto): Promise<ResponseOrder> {
        try {
            const orderEntity = await this.orderRepository.findOne({ where: { orderId: orderDto.orderId }});
            const responseOrder = new ResponseOrder();
            
            orderEntity.qty = orderDto.qty;
            orderEntity.totalPrice = (Number(orderEntity.qty) * Number(orderEntity.unitPrice));
            orderEntity.status = 'RE_ORDER';

            this.client.emit("RE_ORDER", orderEntity);
            
            await this.orderRepository.save(orderEntity);

            responseOrder.orderId = orderEntity.orderId;
            responseOrder.status = orderEntity.status;

            return responseOrder;
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async errorOrder(data: any): Promise<any> {
        const orderEntity = await this.orderRepository.findOne({ where: { orderId: data.orderId }});

        orderEntity.status = "ERROR_ORDER";

        await this.orderRepository.save(orderEntity);

        return "Product stock is less than 0 so please modifying qty, reorder this product";
    }
}