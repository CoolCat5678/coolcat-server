import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users: { id: string; username: string; email: string; role?: string; }[] = [];

    read(id: string) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new UnauthorizedException('User not found');
        }
        return this.users[userIndex];
    }

    readAll() {
        return this.users;
    }

    create(createUserDto: CreateUserDto) {
        const newUser = { ...createUserDto, id: `${this.users.length + 1}` };
        this.users.push(newUser);
        return newUser;
    }

    update(id: string, updateUserDto: CreateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new UnauthorizedException('User not found');
        }
        this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
        return this.users[userIndex];
    }

    remove(id: string) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new UnauthorizedException('User not found');
        }
        const removedUser = this.users.splice(userIndex, 1);
        return removedUser;
    }
}
