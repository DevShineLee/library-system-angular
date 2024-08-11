import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common' // Import Location

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CreateUserComponent implements OnInit {
  signupForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location // Inject Location
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  onSubmit() {
    if (
      this.signupForm.valid &&
      this.signupForm.value.password === this.signupForm.value.confirmPassword
    ) {
      this.userService.createUser(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('User registered', response)
          alert('Welcome!') // Alert for successful registration
          this.router.navigate(['/login']) // Alternative to navigate for redirection
        },
        error: (error) => {
          console.error('Registration failed', error)
        },
        complete: () => console.log('Registration attempt complete'),
      })
    } else {
      console.error('Form is invalid or passwords do not match')
    }
  }
}
