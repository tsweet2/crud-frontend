import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../User.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  private usersSubject = new BehaviorSubject<User[]>([]); // Ensures dataSource is never null
  users$ = this.usersSubject.asObservable(); // Observable for table data

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadUsers();
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // ✅ Forces preflight request
      'Content-Type': 'application/json' // ✅ Non-simple header triggers OPTIONS
    });
  }

  loadUsers() {
    this.http.get<User[]>(this.apiUrl, { headers: this.getHeaders() }).subscribe(users => {
      this.usersSubject.next(users);
    },
    error => {
      console.error("❌ Error loading users:", error);
  });
}

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { headers: this.getHeaders() }).pipe(
      tap(() => {
        this.loadUsers();
      })
    );
  }

  updateUser(user: User): Observable<User> {
      const token = localStorage.getItem('jwt'); // ✅ Retrieve token from storage
    
      if (!token) {
        console.error("❌ No JWT token found, user is not authenticated.");
        return throwError(() => new Error("Unauthorized: No JWT token"));
      }
    
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ✅ Attach token to request
      });
    
      console.log(`📡 Sending API request: PUT /api/users/${user.userID}`, user, headers);
    
      return this.http.put<User>(`${this.apiUrl}/${user.userID}`, user, { headers }).pipe(
        tap(() => console.log('✅ User updated successfully'))
      );
    }
  
  

    deleteUser(userID: number): Observable<void> {
      const token = localStorage.getItem('jwt'); // ✅ Retrieve token
    
      if (!token) {
        console.error("❌ No JWT token found, user is not authenticated.");
        return throwError(() => new Error("Unauthorized: No JWT token"));
      }
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // ✅ Attach token
      });
    
      console.log(`📡 Sending API request: DELETE /api/users/${userID}`, headers);
    
      return this.http.delete<void>(`${this.apiUrl}/${userID}`, { headers }).pipe(
        tap(() => console.log(`✅ User ${userID} deleted successfully`))
      );
    }
}
