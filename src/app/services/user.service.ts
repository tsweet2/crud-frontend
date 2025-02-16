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
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$; // Always returns an Observable
  }

  addUser(user: { firstName: string; lastName: string; phoneNumber: string; emailAddress: string; }): Observable<User> {
    return this.http.post<User>(this.apiUrl, {}).pipe(
      tap(() => this.loadUsers()) // Refresh users after addition
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadUsers()) // Refresh users after deletion
    );
  }
}