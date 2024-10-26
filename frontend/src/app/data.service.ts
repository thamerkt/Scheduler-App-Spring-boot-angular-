import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from './professor.model'; // Assuming you have a model for Professor
import { Class } from './class.model'; // Assuming you have a model for Class
import { Event } from './event.model'; // Assuming you have a model for Event
import { classroom } from 'src/app/classroom.module';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8084/api'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Professor Methods
  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}/professors`);
  }

  createProfessor(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(`${this.apiUrl}/professors`, professor);
  }

  // Class Methods
  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.apiUrl}/classes`);
  }

  createClass(classEntity: Class): Observable<Class> {
    return this.http.post<Class>(`${this.apiUrl}/classes`, classEntity);
  }

  // Event Methods
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/events`, event);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }
  createClassroom(classroom: classroom): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/classrooms`, classroom);
  }

  getClassroom(): Observable<classroom[]> {
    return this.http.get<classroom[]>(`${this.apiUrl}/classrooms`);
  }
  deleteProfessor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/professors/${id}`);
  }
  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/classes/${id}`);
  }
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/events/${id}`);
  }
  deleteClassroom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/classroom/${id}`);
  }
}
