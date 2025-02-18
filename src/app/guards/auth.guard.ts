import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    if (this.authService.isAuthenticated()) {
      return true; // ✅ Allow navigation if user is logged in
    }
    
    this.router.navigate(['/login']); // 🚀 Redirect to login page
    return false;
  }
}

