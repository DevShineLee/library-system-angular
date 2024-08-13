import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  providers: [BookService],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  newBookForm = new FormGroup({
    bookID: new FormControl(''),
    ISBN: new FormControl(''),
    title: new FormControl(''),
    genre: new FormControl(''),
    author: new FormControl(''),
  });
  isLoggedIn: boolean = false; // login status flag

  constructor(
    private bookService: BookService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const search = params['search'];
      this.loadBooks(search);
    });
    this.checkLoginStatus();
    console.log('Subscribing to search queries...');
  }

  loadBooks(search?: string) {
    this.bookService.getBooks(search).subscribe({
      next: (books) => {
        this.books = this.filteredBooks = books;
        this.cd.markForCheck(); // Manually trigger change detection
      },
      error: (error) => {
        console.error('Failed to fetch books', error);
        this.books = [];
        this.filteredBooks = [];
        this.cd.markForCheck();
      },
    });
  }

  checkLoginStatus() {
    // check token from sessionStorage
    this.isLoggedIn = !!sessionStorage.getItem('token');
  }

  addBook() {
    if (this.newBookForm.valid && this.isLoggedIn) {
      this.bookService.addBook(this.newBookForm.value).subscribe({
        next: (book) => {
          this.books.push(book);
          this.filteredBooks.push(book);
          alert('Book added successfully');
          this.newBookForm.reset();
        },
        error: (error) => {
          console.error('Failed to add book', error);
          alert('Failed to add book: ' + error.message);
        },
      });
    } else if (!this.isLoggedIn) {
      alert('You must be logged in to add a book.');
    }
  }

}
