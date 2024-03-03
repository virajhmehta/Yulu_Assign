import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isSubmitting: boolean = false;
  validationErrors: any = [];

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  registerAction() {
    this.isSubmitting = true;
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    if (this.isValidForm()) {
      this.userAuthService
        .register(payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/dashboard');
          return data;
        })
        .catch((error) => {
          this.isSubmitting = false;
          if (error.response.data.errors != undefined) {
            this.validationErrors = error.response.data.errors;
          }
          return error;
        });
    } else {
      this.isSubmitting = false;
      // Handle invalid form
      console.error('Invalid form. Please check the form fields.');
    }
  }

  isValidForm(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.email.trim().length > 0 &&
      this.password.trim().length >= 8 &&
      this.confirmPassword.trim().length > 0 &&
      this.password === this.confirmPassword
    );
  }
}
