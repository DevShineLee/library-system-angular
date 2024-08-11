import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  book: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const bookId = params['id'];
      this.bookService
        .getBookById(bookId)
        .pipe(
          catchError((error) => {
            console.error('Failed to fetch book details', error);
            return of(null); // Handle error by returning a null value
          }),
          takeUntil(this.destroy$)
        )
        .subscribe((book) => {
          if (book) {
            this.book = book;
          } else {
            console.warn('No book found with this ID');
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
