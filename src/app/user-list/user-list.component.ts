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

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatTooltipModule],
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

  onDelete(userID: number) {
    this.userService.deleteUser(userID).subscribe({
      next: () => {
        this.snackBar.open('User deleted', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
      }
    });
  }
}

