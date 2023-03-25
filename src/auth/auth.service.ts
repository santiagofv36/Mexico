import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { SignupDto, AuthDto } from './dtos';
import * as bc from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MySQLService } from '../persistence/mysql.service';

@Injectable()
export class AuthService {

    private users: User[] = [
        {
            id: '1',
            name: 'John Doe',
            email: 'jd@a.com',
            password: '123456',
        },
    ];

    constructor(private jwtService: JwtService, private mysqlService: MySQLService){
    
    }

    hashData(data: string){
        return bc.hash(data, 10);
    }

    async validatePassword(password: string, hashedPassword: string){
        return await bc.compare(password, hashedPassword);
    }

    async getTokens(userId: string, email: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>{
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: 'replacewithEnv',
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: 'replacewithEnv',
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken: at,
            refreshToken: rt,
        };
    }

    async signup(signup: SignupDto) : Promise<{
        accessToken: string;
        refreshToken: string;
    }>{
        signup.password = await this.hashData(signup.password);
        const user = {
            id:  (Math.floor(Math.random() * 1000000) + 1).toString(),
            ...signup,
        };

        const bduser = [parseInt(user.id,10), user.name, user.email, user.password];
        this.mysqlService.execute('addUser',bduser);
        const tokens = await this.getTokens(user.id, user.email);
        return tokens;
    }


    async login(authDto: AuthDto) : Promise<
        {
            accessToken: string;
            refreshToken: string;
        }
    >{
        const bduser = await this.mysqlService.execute('getUserByEmail', [authDto.email]);
        const user = bduser[0][0];
        if(!user){
            throw new ForbiddenException('Access Denied!');
        }
        const isValid = await this.validatePassword(authDto.password, user.clave);
        if(!isValid){
            throw new ForbiddenException('Incorrect Crednetials!');
        }
        const tokens = await this.getTokens(user.id, user.correo);
        const params = [tokens.accessToken, user.correo];
        await this.mysqlService.execute('login', params);
        return this.getTokens(user.id, user.correo);
    }

    async logout(){
        console.log('Tengo el pene diminuto');

    }
    refresh(){}

}
