import { Component, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',

  imports: [FormsModule],

  templateUrl: './register.html',

  styleUrl: './register.css',
})
export class Register {
  authService = inject(AuthService);

  router = inject(Router);

  email = signal('');

  password = signal('');

  async register() {
    try {
      await this.authService.register(this.email(), this.password());

      alert('Account created successfully!');

      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);

      alert('Registration failed.');
    }
  }
}
