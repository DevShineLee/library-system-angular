import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule], // Confirm the import is correct for standalone components
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Non-null assertion operator

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location // Inject Location
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Response:', response);
          alert('Welcome Back!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please try again.');
        },
      });
    } else {
      alert('Please fill in all fields.');
    }
  }
}
