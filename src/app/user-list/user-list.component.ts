import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared-components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import { User } from '../User.model';
import { HttpClient } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatTooltipModule, FormsModule, MatInputModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService, HttpClient]
})
export class UserListComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
  users$: Observable<User[]> | undefined; 

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'emailAddress', 'actions'];

  constructor(
    private userService: UserService,
    private authService: AuthService, // ✅ Inject AuthService
    private router: Router, // ✅ Inject Router
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // ✅ Redirect if not authenticated
      return;
    }

    this.userService.users$.subscribe(users => {
      this.dataSource.data = users;
    });
  }

  openConfirmDialog(userID: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        message: 'Are you sure you want to delete this user?',
        confirmText: 'Yes, Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(userID);
      }
    });
  }

  editUser(user: User) {
    console.log("🛠 Editing user:", user); // ✅ Debugging log
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '400px',
      data: { ...user } // ✅ Ensure userID is included
    });
  
    dialogRef.afterClosed().subscribe(updatedUser => {
      console.log("🔄 Dialog closed. Received updated user:", updatedUser);

      if (!updatedUser) {
        console.error("❌ No user data received from dialog.");
        return;
      }
  
      if (!updatedUser.userID) {
        console.error("❌ Updated user is missing userID:", updatedUser);
        return;
      }
  
      console.log("📡 Sending update request for userID:", updatedUser.userID);
      this.userService.updateUser(updatedUser).subscribe({
        next: () => {
          console.log('✅ User updated successfully');
          this.userService.loadUsers(); // Refresh user list
        },
        error: (err) => console.error("❌ Error updating user:", err)
      });
    });
  }
  

  onDelete(user: any) {
    if (!user || !user.userID) {
      console.error("❌ Error: Invalid user object for deletion:", user);
      return;
    }
  
    const userID = user.userID; // ✅ Extract userID correctly
    console.log(`🗑️ Attempting to delete user with ID: ${userID}`);
  
    this.userService.deleteUser(userID).subscribe({
      next: () => {
        console.log(`✅ User ${userID} deleted successfully`);
        this.userService.loadUsers(); // Refresh user list
      },
      error: (err) => console.error("❌ Error deleting user:", err)
    });
  }
}
