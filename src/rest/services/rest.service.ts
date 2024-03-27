import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { User } from '../models/rest.model';

@Injectable()
export class RestService {
    private users: User[] = [];

    // Create
    createUsers(user: User): User {
        user.id = this.users.length + 1;
        this.users.push(user);
        return user;
      }

    // Get All
    getAllUsers(): User[] {
        return this.users;
    }

    // Get by Id
    getById(id: number): User {
        return this.users.find(user => user.id === id);
    }

    // Update
    update(id: number, updateUser: User): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updateUser };
            return true;
        }
        return false;
    }

    delete(id: number): boolean {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length !== initialLength;
    }
}