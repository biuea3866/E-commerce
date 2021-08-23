import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user/user.service';
import { RequestLogin } from './vo/request.login';
import { RequestRegister } from './vo/request.register';
import { RequestUpdate } from './vo/request.update';
import { ResponseUser } from './vo/response.user';

@Controller('users')
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(@Body() requestLogin: RequestLogin): Promise<any> {
        const userDto = new UserDto();

        userDto.email = requestLogin.email;
        
        return await this.authService.login(userDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('status')
    public async getStatus() {
        return "auth-serivce is working successfully";
    }

    @Post('register')
    public async register(@Body() requestRegister: RequestRegister): Promise<ResponseUser> {
        const userDto = new UserDto();

        userDto.email = requestRegister.email;
        userDto.password = requestRegister.password;
        userDto.nickname = requestRegister.nickname;

        return await this.userService.register(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    public async getUser(@Param('userId') userId: string) {
        return this.userService.getUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":userId")
    public async updateUser(
        @Param('userId') userId: string,
        @Body() requestUpdate: RequestUpdate
    ) {
        const userDto = new UserDto();

        userDto.userId = userId;
        userDto.nickname = requestUpdate.nickname;
        
        return this.userService.updateUser(userDto);
    }
    
    @EventPattern('health_check')
    public async getCatalogServiceStatus(data: any): Promise<any> {
        console.log(data);
        return data;
    }
}