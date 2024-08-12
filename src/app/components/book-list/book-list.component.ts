import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

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
  newBookForm = new FormGroup({
    bookID: new FormControl(''),
    ISBN: new FormControl(''),
    title: new FormControl(''),
    genre: new FormControl(''),
    author: new FormControl(''),
  });
  isLoggedIn: boolean = false; // 로그인 상태 플래그

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (books) => (this.books = books),
      error: (error) => {
        console.error('Failed to fetch books', error);
        this.books = [];
      },
    });

    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // sessionStorage에서 token을 확인
    this.isLoggedIn = !!sessionStorage.getItem('token');
  }

  addBook() {
    if (this.newBookForm.valid && this.isLoggedIn) {
      this.bookService.addBook(this.newBookForm.value).subscribe({
        next: (book) => {
          this.books.push(book);
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
