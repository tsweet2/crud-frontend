import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { async } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared-components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-user-list',
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule],
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
    //users: any[] = [];
    users: {
      userID: number;
emailAddress: any;
phoneNumber: any;
firstName: any;
lastName: any; name: string 
}[] = [];
displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'emailAddress', 'delete'];
  
    constructor(private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog) {}
    async ngOnInit() { 
      this.users = await this.userService.getUsers();
      console.log(this.users);
    }

    openConfirmDialog(userID: number) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: { message: 'Are you sure you want to delete this user?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.onDelete(userID);
        }
      });
    }

    confirmDelete(userID: number) {
      
    }
    onDelete(userID: number) {
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
          this.userService.deleteUser(userID).then(() => {
            this.users = this.users.filter(user => user.userID !== userID);
            this.snackBar.open('User deleted', 'Close', { duration: 3000 });
          });
        } else {
          console.log('User canceled deletion');
          this.snackBar.open('Action Canceled', 'Close', { duration: 3000 });
        }
      });
    }
}
