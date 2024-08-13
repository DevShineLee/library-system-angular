import { Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { CreateUserComponent } from './components/create-user/create-user.component'
import { LoginComponent } from './components/login/login.component'
import { BookListComponent } from './components/book-list/book-list.component'
import { BookDetailComponent } from './components/book-detail/book-detail.component';
// import { MyPageComponent } from './components/my-page/my-page.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },
  { path: 'book-list', component: BookListComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books/:id', component: BookDetailComponent },
  // { path: 'my-page', component: MyPageComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
];
