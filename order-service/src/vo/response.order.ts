import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResponseOrder {
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

    @IsBoolean()
    status: string;
}