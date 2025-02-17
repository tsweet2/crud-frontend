import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../User.model';


@Component({
    selector: 'app-user-form',
    imports: [MatFormFieldModule, CommonModule, MatInputModule, FormsModule, MatButtonModule],
    standalone: true,
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
    user = { firstName: '', lastName: '', phoneNumber: '', emailAddress: '' };
    constructor(private userService: UserService, private snackBar: MatSnackBar) {}
  
    onSubmit() {
        const newUser: User = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phoneNumber: this.user.phoneNumber,
          emailAddress: this.user.emailAddress
        };
      
        this.userService.addUser(newUser).subscribe(response => {
          console.log('User added:', response);
        });
      }
}
