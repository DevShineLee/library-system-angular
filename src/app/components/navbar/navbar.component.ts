import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UserService } from '../../services/user.service'; // Adjust this path if incorrect
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule], // Include CommonModule here
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private userService: UserService, private router: Router) {
    // Assuming userService has an observable to indicate login status
    this.userService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.userService.logout(); // Make sure this method exists and clears the login status
    alert('Bye, See you!');
    this.router.navigate(['/']);
  }
}
