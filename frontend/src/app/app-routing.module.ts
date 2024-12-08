import { NgModule } from '@angular/core';

import { ProfessorsComponent } from './professors/professors.component';
import { ClassesComponent } from './classes/classes.component';
import { EventsComponent } from './events/events.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import LoginComponent from './authentication/login/login.component';
import RegisterComponent from './authentication/register/register.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { CalendarComponent } from './calender/calender.component';

const routes: Routes = [
  { path: 'professors', component: ProfessorsComponent ,canActivate: [AuthGuard]},
  { path: 'classes', component: ClassesComponent,canActivate: [AuthGuard] },
  { path: '', redirectTo: '/professors', pathMatch: 'full' }, // Redirect to professors by default
  { path: 'events', component: EventsComponent,canActivate: [AuthGuard] },
  { path: 'classrooms', component: ClassroomComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: CalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
