import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestUpdate {
    @IsNumber()
    @IsNotEmpty()
    readonly qty: number;
}