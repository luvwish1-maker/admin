import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AlertService } from '../../shared/alert/service/alert.service';
import { AuthService } from '../../core/interceptor/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response) => {
          
          const user = response.data.user;
          this.alertService.showAlert({
            message: 'Login successful!',
            type: 'success',
            autoDismiss: true,
            duration: 4000
          });
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.alertService.showAlert({
            message: err.error.message,
            type: 'error',
            autoDismiss: true,
            duration: 4000
          });
          console.error('Login error:', err);
        }
      });

    } else {
      this.loginForm.markAllAsTouched();
      this.alertService.showAlert({
        message: 'Please fill in all required fields correctly.',
        type: 'error',
        autoDismiss: true,
        duration: 4000
      });
      return;
    }
  }

  get lf() {
    return this.loginForm.controls;
  }
}
