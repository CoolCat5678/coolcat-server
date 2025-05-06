import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ description: 'Unique identifier for the user' })
    id: number;

    @ApiProperty({ description: 'The username of the user', required: false })
    username?: string;

    @ApiProperty({ description: 'The email address of the user', required: false })
    email?: string;

    @ApiProperty({ description: 'The role of the user', required: false })
    role?: string;
}
