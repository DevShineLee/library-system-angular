// edit-book.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;
  bookID: number = 0; // Initialize bookID with a default value

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.editBookForm = new FormGroup({
      bookID: new FormControl({ value: '', disabled: true }),
      ISBN: new FormControl(''),
      title: new FormControl(''),
      genre: new FormControl(''),
      author: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookID = +params['id']; // Ensure bookID is assigned a value
      this.bookService.getBookById(this.bookID).subscribe(
        (book) => {
          this.editBookForm.setValue({
            bookID: book.bookID,
            ISBN: book.ISBN,
            title: book.title,
            genre: book.genre,
            author: book.author,
          });
        },
        (error: any) => {
          console.error('Failed to fetch book for editing', error);
        }
      );
    });
  }

  updateBook() {
    if (this.editBookForm.valid) {
      const updatedBookData = {
        ISBN: this.editBookForm.value.ISBN,
        title: this.editBookForm.value.title,
        genre: this.editBookForm.value.genre,
        author: this.editBookForm.value.author,
      };

      this.bookService.updateBook(this.bookID, updatedBookData).subscribe(
        () => {
          alert('Book updated successfully');
          this.router.navigate(['/books', this.bookID]);
        },
        (error: any) => {
          console.error('Failed to update book', error);
          alert('Failed to update book: ' + error.message);
        }
      );
    }
  }

  deleteBook() {
    this.bookService.deleteBook(this.bookID).subscribe(
      () => {
        alert('Book deleted successfully');
        this.router.navigate(['/book-list']);
      },
      (error: any) => {
        console.error('Failed to delete book', error);
        alert('Failed to delete book: ' + error.message);
      }
    );
  }
  
}
