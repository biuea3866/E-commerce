import { IsString, IsNotEmpty } from 'class-validator';

export class RequestUpdate {
    @IsString()
    @IsNotEmpty()
    readonly nickname: string;
}