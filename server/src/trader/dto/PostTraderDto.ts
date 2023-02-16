import { IsString, IsNumber, MinLength } from 'class-validator';

export class PostTraderDto {
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
    public tradernumber: number;
    @IsNumber()
    public cellphonenumber: number;
}
