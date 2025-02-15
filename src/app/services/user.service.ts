import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = 'http://localhost:8080/api/users';

    async getUsers() { return (await axios.get(this.apiUrl)).data; }
    async getUserById(id: number) { return (await axios.get(`${this.apiUrl}/${id}`)).data; }
    async addUser(user: any) { return (await axios.post(this.apiUrl, user)).data; }
    async deleteUser(id: number) { return (await axios.delete(`${this.apiUrl}/${id}`)).data; }
}