import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

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

  storeToken(token: string): void {
    localStorage.setItem('jwt', token); // ✅ Ensure JWT is stored properly
  }

  getToken(): string | null {
    return localStorage.getItem('jwt'); // ✅ Retrieve JWT token
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // ✅ Check if user is authenticated
  }

  logout(): void {
    localStorage.removeItem('jwt'); // ✅ Clear JWT on logout
  }
}


