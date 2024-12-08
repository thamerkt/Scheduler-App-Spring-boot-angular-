import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emploi';
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check for auth_token in local storage
    const token = localStorage.getItem('auth_token');
    this.isAuthenticated = token !== null;
  }

  logout(): void {
    // Clear token and redirect to login
    localStorage.removeItem('auth_token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
