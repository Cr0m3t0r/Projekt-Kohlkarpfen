import {IsString, MinLength} from 'class-validator';

export class LoginTraderDto {
    @IsString()
    @MinLength(6)
    public password: string;
    @IsString()
    @MinLength(1)
    public email: string;

}