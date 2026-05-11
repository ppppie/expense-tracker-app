import { Component, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',

  imports: [FormsModule],

  templateUrl: './login.html',

  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);

  router = inject(Router);

  email = signal('');

  password = signal('');

  async login() {
    try {
      await this.authService.login(this.email(), this.password());

      alert('Login successful!');

      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);

      alert('Login failed.');
    }
  }
}
