import { IsString, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}