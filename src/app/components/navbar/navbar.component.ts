import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  searchForm!: FormGroup;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    // initiate form group
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''),
    });
  }

  logout() {
    this.userService.logout();
  }

  onSearch(event: Event) {
    event.preventDefault(); // prevent page re-loading
    const query = this.searchForm.get('searchQuery')?.value;
    if (query) {
      console.log('Search Query: ', query);
      this.bookService.setSearchQuery(query);
      this.router.navigate(['/book-list'], { queryParams: { search: query } }); // routing with query param
    }
  }
}
