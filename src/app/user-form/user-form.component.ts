import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../User.model';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
    selector: 'app-user-form',
    imports: [MatFormFieldModule, CommonModule, MatInputModule, FormsModule, MatButtonModule, MatOptionModule, MatSelectModule, MatSnackBarModule],
    standalone: true,
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
    user = { firstName: '', lastName: '', phoneNumber: '', emailAddress: '', password: '', role: '' };
    isSubmitting = false;
    constructor(private userService: UserService, private snackBar: MatSnackBar) {}
  
    onSubmit(form: NgForm) {
      if (form.valid) {
        this.isSubmitting = true; // ✅ Disable button while submitting
  
        this.userService.addUser(this.user).subscribe({
          next: () => {
            console.log('✅ User added successfully!');
            this.snackBar.open('User added successfully!', 'Close', { duration: 3000 }); // ✅ Show Snackbar
            form.resetForm(); // ✅ Clear form after save
            this.user = { firstName: '', lastName: '', phoneNumber: '', emailAddress: '', password: '', role: '' }; // Reset model
            this.isSubmitting = false; // ✅ Re-enable button
          },
          error: () => {
            console.error('❌ Error adding user.');
            this.isSubmitting = false; // ✅ Re-enable button on failure
          }
        });
      }
    }
}
