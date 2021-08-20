import { IsNumber, IsString } from 'class-validator';

export class UserDto {
    @IsNumber()
    id: number;

    @IsString()
    email: string;

    @IsString()
    password: string;
    
    @IsString()
    nickname: string;
    
    @IsString()
    encryptedPwd: string;
    
    @IsString()
    userId: string;
}