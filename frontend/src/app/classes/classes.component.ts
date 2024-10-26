import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Class } from '../class.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes: Class[] = [];
  showAddClasseForm = false; // Property to track visibility of the form
  newClasse: Class = { id: 0, name: '', number: 0, section: '' }; // Initialize with blank professor

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.dataService.getClasses().subscribe((data: Class[]) => {
      this.classes = data;
    });
  }
  toggleAddClasseForm(): void {
    this.showAddClasseForm = !this.showAddClasseForm; // Toggle form visibility
  }

  addClasse(): void {
    // Validate input fields
    if (this.newClasse.name && this.newClasse.number && this.newClasse.section) {
      this.dataService.createClass(this.newClasse).subscribe(
        (newClasse) => {
          console.log('Class added:', this.newClasse); // Log the added professor
          this.classes.push(this.newClasse); // Add the new professor to the list
          this.resetNewClasse(); // Reset the form fields
          this.showAddClasseForm = false; // Hide the form after adding
        },
        (error) => {
          console.error('Error adding professor:', error); // Log any errors
        }
      );
    } else {
      alert('Please fill out all fields.'); // Alert if fields are empty
    }
  }

  deleteClasse(id: number): void {
    this.dataService.deleteClass(id).subscribe(
      () => {
        console.log(`Professor with ID ${id} deleted.`); // Log the deletion
        this.loadClasses(); // Reload the professors list after deletion
      },
      (error) => {
        console.error('Error deleting professor:', error); // Log any errors
      }
    );
  }

  private resetNewClasse(): void {
    // Reset the newProfessor object to its initial state
    this.newClasse = { id: 0, name: '', number: 0, section: '' };
  }
}
