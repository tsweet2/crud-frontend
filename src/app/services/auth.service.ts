import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private userEmailSubject = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // ✅ Initialize email from stored JWT (if available)
    const token = this.getToken();
    if (token) {
      const email = this.getUserEmail();
      this.userEmailSubject.next(email);
    }
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<{ token: string }>(this.apiUrl, { emailAddress: email, password }).pipe(
      tap((response: { token: string }) => {
        if (response.token) {
          this.storeToken(response.token); // ✅ Store JWT
        }
      }),
      map((response: { token: string }) => response.token)
    );
  }

  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub || null; // ✅ Extract email from token
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  storeToken(token: string): void {
    localStorage.setItem('jwt', token);
    
    // ✅ Decode token to extract email and update observable
    const email = this.getUserEmail();
    this.userEmailSubject.next(email);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt'); // ✅ Retrieve JWT token
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // ✅ Check if user is authenticated
  }

  logout(): void {
    console.log("🚪 Logging out user...");
    localStorage.removeItem('jwt'); // ✅ Remove JWT
    this.userEmailSubject.next(null); // ✅ Clear observable state
    this.router.navigate(['/login']); // ✅ Redirect to login
  }
}




