import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      displayName: new FormControl('', [Validators.minLength(3)]),
      password: new FormControl('', [Validators.minLength(3)])
    });
  }

  signUp() {
    this.auth.signUp(this.signUpForm.value).subscribe({
      next: () => this.router.navigate(['home']),
      error: (error) => this.snackbar.open(error.message)
    });
  }


}
