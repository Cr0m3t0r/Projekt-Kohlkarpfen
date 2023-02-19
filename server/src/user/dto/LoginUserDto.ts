import {IsString, MinLength} from 'class-validator';

export class LoginUserDto {
    @IsString()
    @MinLength(6)
    public password: string;
    @IsString()
    @MinLength(1)
    public email: string;

}
