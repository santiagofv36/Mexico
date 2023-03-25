import { Controller, HttpStatus } from '@nestjs/common';
import { Body, HttpCode, Post, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dtos';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() signupDto: SignupDto) : Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        return this.authService.signup(signupDto);
        
    }

    @Post('local/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() authDto: AuthDto) : Promise<{
        accessToken: string;
        refreshToken: string;
    }>{
        return this.authService.login(authDto);
    }

    @Post('local/logout')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    logout(){
        this.authService.logout();
    }

    @Post('local/refresh')
    refresh(){
        this.authService.refresh();
    }

}
