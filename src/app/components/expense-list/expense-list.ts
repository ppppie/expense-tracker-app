import { Component, inject } from '@angular/core';
import { ExpenseService } from '../../services/expense';
import { ExpenseItem } from '../expense-item/expense-item';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  imports: [ExpenseItem, FormsModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList {
  authService = inject(AuthService);

  router = inject(Router);

  constructor() {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/login']);
    }
  }
  expenseService = inject(ExpenseService);
}
