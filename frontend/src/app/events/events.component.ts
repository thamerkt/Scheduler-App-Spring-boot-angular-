import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { DataService } from '../data.service';
import { Professor } from '../professor.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = []; // Change to lowercase 'events'
  newEvent: Event = { title: '', startDateTime:new Date() , endDateTime: new Date(),professorid:1 }; // Initialize new event
  showAddEventForm = false; // Property to toggle the add event form
  professors: Professor[]=[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.dataService.getEvents().subscribe((data: Event[]) => {
      this.events = data; // Update to use 'events'
    });
    this.dataService.getProfessors().subscribe((data: Professor[]) => {
      this.professors = data; // Update to use 'events'
    });

  }

  toggleAddEventForm(): void {
    this.showAddEventForm = !this.showAddEventForm; // Toggle the form visibility
  }

  addEvent(): void {
    if (this.newEvent.title && this.newEvent.startDateTime && this.newEvent.endDateTime) {
      this.dataService.createEvent(this.newEvent).subscribe((event) => {
        console.log('Event added:', event);
        this.events.push(event); // Add the new event to the list
        this.newEvent = { title: '', startDateTime: new Date(), endDateTime:new Date(),professorid:1 }; // Reset the form
        this.showAddEventForm = false; // Hide the form after adding
      });
    } else {
      alert('Please fill out all fields.');
    }
  }

  deleteEvent(id: number): void {
    this.dataService.deleteEvent(id).subscribe(() => {
      // Reload the events list after deletion
      this.loadEvents();
    });
  }

  editEvent(id: number): void {
    // Implement edit functionality as needed
    console.log(`Edit event with ID: ${id}`);
  }
}
