import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false;
  validationErrors: Array<any> = [];

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
   
    if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  loginAction() {
    this.isSubmitting = true;
    let payload = {
      email: this.email,
      password: this.password,
    };

    this.userAuthService
      .login(payload)
      .then((response) => {
        
        if (response && response.data) {
          localStorage.setItem('token', response.data.token);
          this.router.navigateByUrl('/dashboard');
        } else {
          console.error('Invalid response structure:', response);
        }
      })
      .catch((error) => {
        this.isSubmitting = false;
        if (error.response && error.response.data && error.response.data.errors) {
          this.validationErrors = error.response.data.errors;
        } else if (error.response && error.response.data && error.response.data.error) {
          this.validationErrors = [error.response.data.error];
        } else {
          console.error('Unexpected error structure:', error);
        }
      });
  }
}
