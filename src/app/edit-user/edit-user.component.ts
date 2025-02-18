import { Component, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { User } from '../User.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-user',
  imports: [MatDialogModule, MatFormFieldModule, CommonModule, FormsModule, MatOptionModule, MatInputModule, MatSelectModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  save(): void {
    if (!this.user.id) {
      console.error("❌ Error: userID is missing, cannot update user.");
      return;
    }
  
    console.log("🛠 Sending update request for userID:", this.user.id);
    this.dialogRef.close(this.user); // Send the user data back to the parent
  }
  

  cancel(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}
