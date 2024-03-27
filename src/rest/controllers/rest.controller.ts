import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { RestService } from '../services/rest.service';
import { User } from '../models/rest.model';

@Controller('rest')
export class RestController {
    constructor(private readonly restService: RestService) {}


    // Get All User
    @Get()
    getAllUser(): User[] {
        return this.restService.getAllUsers();
    }

    // Create User
    @Post()
    createUser(@Body() user: User): User {
        return this.restService.createUsers(user);
    }

    // Update
    @Put(':id')
    update(@Param('id') id: string, @Body() user: User): string {
        const updated = this.restService.update(parseInt(id, 10), user);
        if (!updated) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return `User with ID ${id} has been updated`;

    }

    @Delete(':id')
    delete(@Param('id') id: string): string {
        const deleted = this.restService.delete(parseInt(id, 10));
        if (!deleted) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return `User with ID ${id} has been deleted`;
    }
}
