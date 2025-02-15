import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-user-form',
    imports: [MatFormFieldModule, CommonModule, MatInputModule, FormsModule, MatButtonModule],
    standalone: true,
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
    user = { firstName: '', lastName: '', phoneNumber: '', emailAddress: '' };
    constructor(private userService: UserService) {}
    async saveUser() { await this.userService.addUser(this.user); }

    onSubmit() {
        this.saveUser();
    }
}
