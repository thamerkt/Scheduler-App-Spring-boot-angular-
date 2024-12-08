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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalendarDayModule, CalendarModule, CalendarMonthModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';



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
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    CalendarDayModule,
    CalendarMonthModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })],
  

    

 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
