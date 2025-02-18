import { Component } from '@angular/core';
import { RouterOutlet , RouterLink} from '@angular/router';
import { UserListComponent } from "./user-list/user-list.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private authService: AuthService) {}
  title = 'crud-frontend';

  isAuthenticated(): boolean {
    console.log('Checking if user is authenticated...' + this.authService.isAuthenticated());
    return this.authService.isAuthenticated(); // ✅ Check if user is logged in
  }

  logout() {
    this.authService.logout();
  }
}
