import { Component } from '@angular/core';
import { GoogleCalendarService } from '../google-calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalendarComponent {
  events: any[] = [];

  constructor(private googleCalendarService: GoogleCalendarService) {}

  ngOnInit() {
    this.googleCalendarService.signIn().then(() => {
      this.loadEvents();
    });
  }

  loadEvents() {
    this.googleCalendarService.listEvents().subscribe((events) => {
      this.events = events;
    });
  }
}
