import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
      console.log("✅ Users retrieved:", users);
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
    console.log("Sending user:", user);
    return this.http.post<User>(this.apiUrl, user, { headers: this.getHeaders() }).pipe(
      tap(() => {
        console.log("User added successfully");
        this.loadUsers();
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      tap(() => this.loadUsers())
    );
  }
}
