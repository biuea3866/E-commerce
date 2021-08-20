import { IsString, IsNotEmpty } from 'class-validator';

export class RequestRegister {
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
    readonly password: string;
    
    @IsString()
    @IsNotEmpty()
    readonly nickname: string;
}