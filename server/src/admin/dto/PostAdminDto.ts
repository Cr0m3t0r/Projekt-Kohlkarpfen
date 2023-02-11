import { IsString, MinLength } from 'class-validator';

export class PostAdminDto {
    @IsString()
    @MinLength(1)
    public username: string;
    @IsString()
    @MinLength(6)
    public password: string;
    @IsString()
    @MinLength(1)
    public role: string;
}
