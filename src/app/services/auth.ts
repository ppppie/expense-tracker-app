import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  firebaseAuth = inject(Auth);

  currentUser = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.currentUser.set(user);
    });
  }

  // Register
  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  // Login
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  // Logout
  async logout() {
    await signOut(this.firebaseAuth);

    this.router.navigate(['/login']);
  }
}
