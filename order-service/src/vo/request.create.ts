import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestCreate {
    @IsString()
    @IsNotEmpty()
    readonly productId: string;
    
    @IsString()
    @IsNotEmpty()
    readonly productName: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly qty: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly unitPrice: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly totalPrice: number;
    
    @IsString()
    @IsNotEmpty()
    readonly userId: string;
}