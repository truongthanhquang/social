import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export default class RegisterDto {
    @IsNotEmpty()
    public first_name: string | undefined;
    @IsNotEmpty()
    public last_name: string | undefined;
    @IsNotEmpty()
    @MinLength(6,{
        message: 'Password min length is 6 char'
    })
    public password: string | undefined;
    @IsNotEmpty()
    @IsEmail()
    public email: string | undefined;
}