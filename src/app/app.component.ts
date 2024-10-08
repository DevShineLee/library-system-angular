import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { HomeComponent } from './components/home/home.component'

import { CreateUserComponent } from './components/create-user/create-user.component'
import { LoginComponent } from './components/login/login.component'

import { NavbarComponent } from './components/navbar/navbar.component'
import { FooterComponent } from './components/footer/footer.component'
import { BookListComponent } from './components/book-list/book-list.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    BookListComponent,
    LoginComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'library'
}
