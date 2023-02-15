import {IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';

export class PostUserDto {
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    public fullname: string;
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    public password: string;
   @IsString()
    @MinLength(1)
   @IsNotEmpty()
    public email: string;
    @IsNumber()
    @IsNotEmpty()
    public cellphonenumber:number
}
