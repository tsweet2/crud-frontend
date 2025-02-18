import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    console.log('Checking if user is authenticated...');

    if (this.authService.isAuthenticated()) {
      console.log('✅ User is authenticated');
      return true; // ✅ Allow navigation if user is logged in
    }
    
    console.warn('🚫 Access denied. Redirecting to login.');
    this.router.navigate(['/login']); // 🚀 Redirect to login page
    return false;
  }
}

