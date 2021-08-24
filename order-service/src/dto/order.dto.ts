import { IsNumber, IsString } from "class-validator";

export class OrderDto {
    @IsString()
    orderId: string;
    
    @IsString()
    productId: string;
    
    @IsString()
    productName: string;
    
    @IsNumber()
    qty: number;
    
    @IsNumber()
    unitPrice: number;
    
    @IsNumber()
    totalPrice: number;
    
    @IsString()
    userId: string;
}