import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../User.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  private usersSubject = new BehaviorSubject<any[]>([]); // Ensures dataSource is never null
  users$ = this.usersSubject.asObservable(); // Observable for table data

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>(this.apiUrl).subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$; // Always returns an Observable
  }

  addUser(user: User): Observable<User> {
  console.log("Sending user:", user); // ✅ Debugging
  return this.http.post<User>(this.apiUrl, user).pipe(
    tap(() => {
      console.log("User added successfully"); // ✅ Debugging
      this.loadUsers();
    })
  );
}

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadUsers()) // Refresh users after deletion
    );
  }
}