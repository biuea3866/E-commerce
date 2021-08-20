import { IsNotEmpty, IsNumber } from "class-validator";

export class RequestUpdate {
    @IsNumber()
    @IsNotEmpty()
    readonly stock: number;

    @IsNumber()
    @IsNotEmpty()
    readonly unitPrice: number;
}