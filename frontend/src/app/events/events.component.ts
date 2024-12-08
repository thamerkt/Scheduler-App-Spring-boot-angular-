import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { DataService } from '../data.service';
import { Professor } from '../professor.model';
import { Classe } from '../class.model';
import { classroom } from '../classroom.module';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Event[] = []; // Holds the list of events
  newEvent: Event = {
    id: 0, // Assuming events have an ID
    title: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    professor: { id: 0, name: '', email: '', subject: '', cin: '' },
    classe: { id: 0, name: '', number: 0, section: '' },
    classroom: { id: 0, number: 0, type: '', bloc: '' },
  }; // Template for new events
  showAddEventForm = false; // Toggle for the add event form
  professors: Professor[] = [];
  classes: Classe[] = [];
  classrooms: classroom[] = []; // Corrected model

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadProfessors();
    this.loadClasses();
    this.loadClassrooms();
  }

  loadEvents(): void {
    this.dataService.getEvents().subscribe(
      (data) => {
        this.events = data.map((event) => ({
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }));
      },
      (error) => console.error('Error loading events:', error)
    );
  }

  loadProfessors(): void {
    this.dataService.getProfessors().subscribe(
      (data: Professor[]) => {
        this.professors = data;
      },
      (error) => console.error('Error loading professors:', error)
    );
  }

  loadClasses(): void {
    this.dataService.getClasses().subscribe(
      (data: Classe[]) => {
        this.classes = data;
      },
      (error) => console.error('Error loading classes:', error)
    );
  }

  loadClassrooms(): void {
    this.dataService.getClassroom().subscribe(
      (data: classroom[]) => {
        this.classrooms = data;
      },
      (error) => console.error('Error loading classrooms:', error)
    );
  }

  toggleAddEventForm(): void {
    this.showAddEventForm = !this.showAddEventForm;
  }

  addEvent(): void {
    if (this.newEvent.title && this.newEvent.startDateTime && this.newEvent.endDateTime) {
      this.dataService.createEvent(this.newEvent).subscribe(
        (event) => {
          this.events.push(event);
          this.resetNewEventForm();
          this.showAddEventForm = false;
        },
        (error) => console.error('Error adding event:', error)
      );
    } else {
      alert('Please fill out all fields.');
    }
  }

  deleteEvent(id: number): void {
    this.dataService.deleteEvent(id).subscribe(
      () => this.loadEvents(),
      (error) => console.error('Error deleting event:', error)
    );
  }

  editEvent(id: number): void {
    console.log(`Edit event with ID: ${id}`);
  }

  private resetNewEventForm(): void {
    this.newEvent = {
      id: 0,
      title: '',
      startDateTime: new Date(),
      endDateTime: new Date(),
      professor: { id: 0, name: '', email: '', subject: '', cin: '' },
      classe: { id: 0, name: '', number: 0, section: '' },
      classroom: { id: 0, number: 0, type: '', bloc: '' },
    };
  }
}
