import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Expense } from '../../../models/expense.model';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-expense-item',
  imports: [RouterLink],
  templateUrl: './expense-item.html',
  styleUrl: './expense-item.css',
})
export class ExpenseItem {
  expense = input.required<Expense>();

  expenseService = inject(ExpenseService);

  // adding emoji so it's easier to see
  getCategoryEmoji(category: string) {
    switch (category) {
      case 'Food':
        return '🍽️';

      case 'Travel':
        return '✈️';

      case 'Shopping':
        return '🛍️';

      case 'Utilities':
        return '🏠';

      case 'Work':
        return '💼';

      case 'Personal':
        return '👤';

      case 'Grocery':
        return '🛒';

      default:
        return '📦';
    }
  }

  deleteExpense() {
    this.expenseService.deleteExpense(this.expense().id);
  }
}
