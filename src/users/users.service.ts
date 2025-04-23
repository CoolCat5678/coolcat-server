import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async read(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async readAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<UserEntity> {
        const user = await this.userRepository.preload({
            id,
            ...updateUserDto,
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.userRepository.save(user);
    }

    async remove(id: number): Promise<UserEntity> {
        const user = await this.read(id);
        return this.userRepository.remove(user);
    }
}
