import { IsNotEmpty, IsString } from 'class-validator';

export class RequestLogin {
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}