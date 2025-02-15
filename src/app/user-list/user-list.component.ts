import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { async } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  
    constructor(private userService: UserService, private snackBar: MatSnackBar) {}
    async ngOnInit() { 
      this.users = await this.userService.getUsers();
      console.log(this.users);
    }

    async onDelete(userID: number) {
      try {
          await this.userService.deleteUser(userID);
          this.users = this.users.filter(user => user.userID !== userID);
          this.snackBar.open('User deleted', 'Close', { duration: 3000 });
      } catch (error) {
          this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
          console.error('Delete error:', error);
      }
    }
        
}
