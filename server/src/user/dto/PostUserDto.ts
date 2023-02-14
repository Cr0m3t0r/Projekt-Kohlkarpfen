import {IsNumber, IsString, MinLength} from 'class-validator';

export class PostUserDto {
    @IsString()
    @MinLength(1)
    public fullname: string;
    @IsString()
    @MinLength(6)
    public password: string;
    @IsString()
    @MinLength(1)
    public email: string;
    @IsNumber()
    @MinLength(1)
    public cellphonenumber:number
}
