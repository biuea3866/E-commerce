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
    readonly stock: number;

    @IsNumber()
    @IsNotEmpty()
    readonly unitPrice: number;
};