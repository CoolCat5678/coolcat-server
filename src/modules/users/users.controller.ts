import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Get users by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully fetched user',
        type: UserDto,
        schema: {
            example: {
                id: '1',
                username: 'coolcat',
                email: 'coolcat@example.com',
                role: 'user',
            },
        },
    })
    getUser (@Param('id') id: number): Promise<UserDto> {
        return this.usersService.read(id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Successfully fetched users',
        type: [UserDto],
        schema: {
            example: [
                {
                    id: '1',
                    username: 'coolcat',
                    email: 'coolcat@example.com',
                    role: 'user',
                },
            ],
        },
    })
    getAllUsers (): Promise<UserDto[]> {
        return this.usersService.readAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({
        status: 201,
        description: 'User created successfully',
        type: UserDto,
        schema: {
            example: {
                statusCode: 201,
                message: 'User created',
                body: {
                    id: '2',
                    username: 'coolcat',
                    email: 'coolcat@example.com',
                    role: 'user',
                },
            },
        },
    })
    @ApiBody({ type: CreateUserDto })
    createUser (@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiResponse({
        status: 200,
        description: 'User updated successfully',
        type: UserDto,
        schema: {
            example: {
                statusCode: 200,
                message: 'User updated',
                body: {
                    id: '1',
                    username: 'coolcat',
                    email: 'coolcat@example.com',
                    role: 'admin',
                },
            },
        },
    })
    @ApiBody({ type: UpdateUserDto })
    updateUser (
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserDto> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({
        status: 200,
        description: 'User deleted successfully',
        type: UserDto,
        schema: {
            example: {
                statusCode: 200,
                message: 'User deleted',
                body: {
                    id: '1',
                    username: 'coolcat',
                    email: 'coolcat@example.com',
                    role: 'admin',
                },
            },
        },
    })
    deleteUser (@Param('id') id: number): Promise<UserDto> {
        return this.usersService.delete(id);
    }
}
