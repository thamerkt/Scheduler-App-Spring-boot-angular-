import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private authService: UserService, private router: Router) {
    this.logout();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        localStorage.removeItem('auth_token'); 
        this.router.navigate(['/login']); 
      },
      error: (err: any) => {
        console.error('Error during logout:', err);
        alert('Logout failed!');
      },
    });
  }

}
