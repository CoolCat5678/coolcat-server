import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({ description: 'The name of the user', example: 'coolcat' })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiPropertyOptional({ description: 'The email of the user', example: 'coolcat@example.com' })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ description: 'The role of the user', example: 'user' })
    @IsString()
    @IsOptional()
    role?: string;
}
