import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addMinutes } from 'date-fns';
import { DataService } from '../data.service';
import { Event } from '../event.model';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalendarComponent implements OnInit {
  
  events: CalendarEvent[] = [];
  viewDate: Date = new Date();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadEvents();
    console.log(this.events);
    
  }

  loadEvents(): void {
    this.dataService.getEvents().subscribe((data: any[]) => {
      this.events = data.map((event: any) => ({
        id: Number(event.id), // Convert to number if necessary
        start: new Date(
          event.startDateTime[0], // Year
          event.startDateTime[1] - 1, // Month (zero-based index)
          event.startDateTime[2], // Day
          event.startDateTime[3], // Hours
          event.startDateTime[4] // Minutes
        ),
        end: new Date(
          event.endDateTime[0], // Year
          event.endDateTime[1] - 1, // Month (zero-based index)
          event.endDateTime[2], // Day
          event.endDateTime[3], // Hours
          event.endDateTime[4] // Minutes
        ),
        title: event.title,
        classroomNumber: event.classroom?.number || '145', // Default to 145 if not available
        color: { primary: '#ad2121', secondary: '#FAE3E3' },
      }));
      console.log(this.events); // Log the events to verify
    });
  }
  

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(`${action}: ${event.title}`);
  }

  onDragMoved(event: any): void {
    console.log('Dragging: ', event);
  }

  onDragEnded(event: any): void {
    const draggedEvent: Event = event.source.data;

    // Calculate time offset based on drag distance, assuming each pixel represents a certain time increment.
    const timeOffsetMinutes = Math.round(event.distance.x); // Adjust scale as needed, e.g., `event.distance.x * 2`
    const newStartTime = addMinutes(draggedEvent.startDateTime, timeOffsetMinutes);
    const duration = (draggedEvent.endDateTime.getTime() - draggedEvent.startDateTime.getTime()) / (1000 * 60); // duration in minutes
    const newEndTime = addMinutes(newStartTime, duration);

    // Update the event’s start and end times
    draggedEvent.startDateTime = newStartTime;
    draggedEvent.endDateTime = newEndTime;

    // Optionally, update the event data on the server
    this.dataService.UpdateEvent(draggedEvent.id, draggedEvent).subscribe(() => {
      console.log('Event updated:', draggedEvent);
    });
  }
}
