import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ResponseUser } from '../vo/response.user';
import { hash } from 'src/util/util.hash';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    public async register(userDto: UserDto) : Promise<ResponseUser> {  
        try {
            const user = new UserEntity();

            user.email = userDto.email;
            user.encryptedPwd = await hash(userDto.password);
            user.nickname = userDto.nickname;
            user.userId = uuid();

            await this.userRepository.save(user);
            
            const responseUser = new ResponseUser();

            responseUser.email = user.email;
            responseUser.encryptedPwd = user.encryptedPwd;
            responseUser.nickname = user.nickname;
            responseUser.userId = user.userId;

            return responseUser;
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async login(userDto: UserDto): Promise<ResponseUser> {
        try {
            const responseUser = new ResponseUser();

            responseUser.email = userDto.email;
            responseUser.encryptedPwd = userDto.encryptedPwd;
            responseUser.nickname = userDto.nickname;
            responseUser.userId = userDto.userId;

            return await responseUser;
        } catch(err) {
            throw new HttpException(
                err,
                HttpStatus.BAD_REQUEST
            );
        }
    }

    public async getUser(userId: string): Promise<ResponseUser> {
        return await this.userRepository
                         .findOne({ where: { userId: userId }});
    }

    updateUser(userDto: UserDto): Promise<UserDto> {
        return;
    }

    public async loadByEmail(email: string) : Promise<any> {
        return await this.userRepository
                         .findOne({ where: { email: email }});
    }
}
