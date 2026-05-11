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

  deleteExpense() {
    this.expenseService.deleteExpense(this.expense().id);
  }
}
