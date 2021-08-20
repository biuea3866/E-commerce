import { IsNumber, IsString } from "class-validator";

export class CatalogDto {
    @IsString()
    productId: string;

    @IsString()
    productName: string;

    @IsNumber()
    stock: number;

    @IsNumber()
    unitPrice: number;
}