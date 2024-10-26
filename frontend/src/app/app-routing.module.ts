import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorsComponent } from './professors/professors.component';
import { ClassesComponent } from './classes/classes.component';
import { EventsComponent } from './events/events.component';
import { ClassroomComponent } from './classroom/classroom.component';

const routes: Routes = [
  { path: 'professors', component: ProfessorsComponent },
  { path: 'classes', component: ClassesComponent },
  { path: '', redirectTo: '/professors', pathMatch: 'full' }, // Redirect to professors by default
  { path: 'events', component: EventsComponent },
  { path: 'classrooms', component: ClassroomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
