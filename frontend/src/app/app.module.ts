import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfessorsComponent } from './professors/professors.component';
import { ClassesComponent } from './classes/classes.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './calender/calender.component';
import { EventsComponent } from './events/events.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ProfessorsComponent,
    ClassesComponent,
    CalendarComponent,
    EventsComponent,
    ClassroomComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
