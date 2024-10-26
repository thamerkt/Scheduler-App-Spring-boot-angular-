import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Professor } from '../professor.model';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {
  professors: Professor[] = []; // List of professors
  showAddProfessorForm = false; // Property to track visibility of the form
  newProfessor: Professor = { id: 0, name: '', email: '', subject: '' }; // Initialize with blank professor

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadProfessors(); // Load professors when the component initializes
  }

  loadProfessors(): void {
    this.dataService.getProfessors().subscribe(
      (data: Professor[]) => {
        this.professors = data; // Assign the received data to the professors array
      },
      (error) => {
        console.error('Error loading professors:', error); // Log any errors
      }
    );
  }

  toggleAddProfessorForm(): void {
    this.showAddProfessorForm = !this.showAddProfessorForm; // Toggle form visibility
  }

  addProfessor(): void {
    // Validate input fields
    if (this.newProfessor.name && this.newProfessor.email && this.newProfessor.subject) {
      this.dataService.createProfessor(this.newProfessor).subscribe(
        (professor) => {
          console.log('Professor added:', professor); // Log the added professor
          this.professors.push(professor); // Add the new professor to the list
          this.resetNewProfessor(); // Reset the form fields
          this.showAddProfessorForm = false; // Hide the form after adding
        },
        (error) => {
          console.error('Error adding professor:', error); // Log any errors
        }
      );
    } else {
      alert('Please fill out all fields.'); // Alert if fields are empty
    }
  }

  deleteProfessor(id: number): void {
    this.dataService.deleteProfessor(id).subscribe(
      () => {
        console.log(`Professor with ID ${id} deleted.`); // Log the deletion
        this.loadProfessors(); // Reload the professors list after deletion
      },
      (error) => {
        console.error('Error deleting professor:', error); // Log any errors
      }
    );
  }

  private resetNewProfessor(): void {
    // Reset the newProfessor object to its initial state
    this.newProfessor = { id: 0, name: '', email: '', subject: '' };
  }
}
