import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense';
import { ExpenseCategory, TransactionType } from '../../../models/expense.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-add-expense',
  imports: [FormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense {
  authService = inject(AuthService);

  constructor() {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/login']);
    }
  }
  expenseService = inject(ExpenseService);
  router = inject(Router);

  title = '';
  amount = 0;
  category: ExpenseCategory = 'Other';

  date = new Date().toISOString().split('T')[0];
  notes = '';
  type: TransactionType = 'Expense';

  addExpense() {
    if (!this.title || this.amount <= 0) {
      return;
    }

    // Add the new expense to the service, crypto.randomUUID() generates a unique id for the expense - idea from AI
    this.expenseService.addExpense({
      id: crypto.randomUUID(),
      title: this.title,
      amount: this.amount,
      category: this.category,
      date: this.date,
      notes: this.notes,
      type: this.type,
    });

    this.title = '';
    this.amount = 0;
    this.category = 'Other';

    this.date = new Date().toISOString().split('T')[0];
    this.notes = '';
    this.type = 'Expense';

    this.router.navigate(['/expenses']);
  }
}
