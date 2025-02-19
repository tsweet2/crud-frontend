import { Component, OnInit } from '@angular/core';
import { RouterOutlet , RouterLink} from '@angular/router';
import { UserListComponent } from "./user-list/user-list.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, CommonModule, MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  userEmail: string | null = '';
  constructor(private authService: AuthService) {}
  title = 'crud-frontend';

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); // ✅ Check if user is logged in
  }

  openChangePasswordDialog() {

  }

  logout() {
    this.authService.logout();
  }
}
