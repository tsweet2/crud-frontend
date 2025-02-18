import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard] }, // ✅ Protected route
    { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] }, // ✅ Protected route
];
