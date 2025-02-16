import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
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
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService, HttpClient]

})
export class UserListComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
  users$: Observable<User[]> | undefined; 

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'emailAddress', 'delete'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userService.users$.subscribe(users => {
      this.dataSource.data = users; // Correctly assigns array data
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

  onDelete(userID: number) {
    this.userService.deleteUser(userID).subscribe({
      next: () => {
        this.snackBar.open('User deleted', 'Close', { duration: 3000 });
        // No need to manually update users$, it's handled in the service
      },
      error: () => {
        this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
      }
    });
  }  
}

