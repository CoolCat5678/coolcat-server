import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'Unique identifier for the user' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The username of the user' })
    username: string;

    @Column()
    @ApiProperty({ description: 'The email address of the user' })
    email: string;

    @Column()
    @ApiProperty({ description: 'The role of the user' })
    role: string;
}
