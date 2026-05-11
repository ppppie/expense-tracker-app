import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense';
import { ExpenseCategory } from '../../../models/expense.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  imports: [FormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense {
  expenseService = inject(ExpenseService);
  router = inject(Router);

  title = '';
  amount = 0;
  category: ExpenseCategory = 'Other';

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
    });

    this.title = '';
    this.amount = 0;
    this.category = 'Other';

    this.router.navigate(['/expenses']);
  }
}
