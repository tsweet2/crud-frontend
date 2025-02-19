import { Component, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { User } from '../User.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-user',
  imports: [MatDialogModule, MatFormFieldModule, CommonModule, FormsModule, MatOptionModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  passwordVisible = false;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  save(): void {
    if (!this.user.userID) {
      console.error("❌ Error: userID is missing, cannot update user.");
      return;
    }
  
    // ✅ Ensure password field is included in the request only if it's changed
    if (!this.user.password || this.user.password.trim() === '') {
      console.log("🔹 No new password provided, keeping existing password.");
      delete this.user.password; // Prevent overwriting password with empty value
    } else {
      console.log("🔹 Password changed, sending updated password.");
    }
  
    console.log("🛠 Sending update request for userID:", this.user.userID, this.user);
    this.dialogRef.close(this.user); // Send the user data back to the parent component
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  
  cancel(): void {
    console.log("❌ Edit canceled, closing dialog.");
    this.dialogRef.close();
  }
}  
