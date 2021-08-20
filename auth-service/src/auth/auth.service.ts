import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { isHashValid } from 'src/util/util.hash';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,  
    ) {}

    public async validateUser(
        email: string,
        password: string
    ) : Promise<any> {
        Logger.log(email);
        const user = await this.userService.loadByEmail(email);

        if(user && isHashValid(password, user.encryptedPwd)) {
            const { ...result } = user;

            return result;
        }

        return null;
    }

    public async login(userDto: UserDto) {
        const user = await this.userService.loadByEmail(userDto.email);
        const payload = { 
            email:  user.email,
            sub: user.userId,
        };
        
        userDto.encryptedPwd = user.encryptedPwd;
        userDto.id = user.id;
        userDto.nickname = user.nickname;

        return {
            access_token: this.jwtService.sign(payload),
            user: userDto,    
        }
    }
}
