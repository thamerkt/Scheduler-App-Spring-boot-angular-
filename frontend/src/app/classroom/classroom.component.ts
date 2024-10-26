import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { classroom } from '../classroom.module';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  classrooms: classroom[] = []; // Corrected to match model naming conventions
  showAddClasseForm = false; // Property to track visibility of the form
  newClassroom: classroom = { id: 0, number: 0, type: '', bloc: '' }; // Ensure consistent casing of `Classroom`

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadClassrooms(); // Load classrooms when component is initialized
  }

  // Fetch the list of classrooms
  loadClassrooms(): void {
    this.dataService.getClassroom().subscribe((data: classroom[]) => {
      this.classrooms = data;
    });
  }

  // Toggle the visibility of the 'Add Classroom' form
  toggleAddClasseForm(): void {
    this.showAddClasseForm = !this.showAddClasseForm;
  }

  // Add a new classroom
  addClassroom(): void {
    if (this.newClassroom.number && this.newClassroom.type && this.newClassroom.bloc) {
      this.dataService.createClassroom(this.newClassroom).subscribe(
        (newClassroom) => {
          console.log('Classroom added:', newClassroom);
          this.classrooms.push(this.newClassroom); // Push newly created classroom to the list
          this.resetNewClassroom(); // Reset the form fields
          this.showAddClasseForm = false; // Hide the form after adding
        },
        (error) => {
          console.error('Error adding classroom:', error); // Log any errors
        }
      );
    } else {
      alert('Please fill out all fields.');
    }
  }

  // Delete a classroom by ID
  deleteClassroom(id: number): void {
    this.dataService.deleteClassroom(id).subscribe(
      () => {
        console.log(`Classroom with ID ${id} deleted.`);
        this.loadClassrooms(); // Reload the list of classrooms after deletion
      },
      (error) => {
        console.error('Error deleting classroom:', error); // Log any errors
      }
    );
  }

  // Reset the newClassroom object to its initial state
  private resetNewClassroom(): void {
    this.newClassroom = { id: 0, number: 0, type: '', bloc: '' };
  }
}
