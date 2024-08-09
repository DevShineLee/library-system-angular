import { Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'

import { CreateUserComponent } from './components/create-user/create-user.component'
import { LoginComponent } from './components/login/login.component'

import { BookListComponent } from './components/book-list/book-list.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      // { path: 'createUser', component: CreateUserComponent },
      { path: 'book/:id', component: BookListComponent },
      // { path: 'login', component: LoginComponent },
      // { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'book-list',
    component: BookListComponent,
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
]
