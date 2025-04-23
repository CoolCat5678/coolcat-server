import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'The name of the user', example: 'coolcat' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'The email of the user', example: 'coolcat@example.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The role of the user', example: 'user', required: false })
    @IsString()
    @IsOptional()
    role?: string;
}
