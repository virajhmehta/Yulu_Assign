// user-auth.service.ts

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private apiUrl = 'http://localhost:3000/auth'; 

  constructor() { }

  private handleError(error: any): Promise<never> {
    console.error('API Error:', error);
    return Promise.reject('An error occurred. Please try again.'); 
  }

  login(data: any): Promise<any> {
    const payload = {
      email: data.email,
      password: data.password
    };
  
    return axios.post(`${this.apiUrl}/login`, payload)
      .then(response => response.data)  // <-- Update this line
      .catch(this.handleError);
  }

  register(data: any): Promise<any> {
    const payload = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      password: data.password,
      role: data.role,
      
    };

    return axios.post(`${this.apiUrl}/signup`, payload)
      .then(response => response.data)
      .catch(this.handleError);
  }

  getUser(): Promise<any> {
    return axios.get(`${this.apiUrl}/users`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
      .then(response => response.data)
      .catch(this.handleError);
  }

  editUser(userId: number, newData: any): Promise<any> {
    return axios.put(`${this.apiUrl}/users/${userId}`, newData, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
      .then(response => response.data)
      .catch(this.handleError);
  }

  logout(): Promise<any> {
    return axios.post(`${this.apiUrl}/logout`, {}, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
      .then(response => response.data)
      .catch(this.handleError);
  }
}
