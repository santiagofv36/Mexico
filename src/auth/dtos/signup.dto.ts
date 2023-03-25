import { IsNotEmpty,IsEmail, IsString } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}