import { IsNotEmpty, IsNumber } from "class-validator";

export class RequestUpdate {
    @IsNumber()
    @IsNotEmpty()
    readonly qty: number;

    @IsNumber()
    @IsNotEmpty()
    readonly totalPrice: number;
}