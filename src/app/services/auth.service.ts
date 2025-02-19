import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        if (response.token) {
          this.storeToken(response.token); // ✅ Store JWT
          localStorage.setItem('userRole', response.role); // ✅ Store Role
        }
      }),
      map((response) => response)
    );
  }

  storeToken(token: string): void {
    localStorage.setItem('jwt', token); // ✅ Ensure JWT is stored properly
  }

  getToken(): string | null {
    return localStorage.getItem('jwt'); // ✅ Retrieve JWT token
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!this.getToken(); // ✅ Check if user is authenticated
  }

  logout(): void {
    if(confirm("Are you sure you want to log out?")) {
    localStorage.removeItem('jwt'); // ✅ Remove stored token
    this.router.navigate(['/login']); // ✅ Redirect to login page
  }
}
}


