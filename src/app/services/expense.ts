import { Injectable, computed, signal } from '@angular/core';
import { Expense, ExpenseCategory } from '../../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  expenses = signal<Expense[]>([]);

  categories = signal<ExpenseCategory[]>([
    'Work',
    'Personal',
    'Grocery',
    'Utilities',
    'Shopping',
    'Travel',
    'Food',
    'Other',
  ]);

  totalExpenses = computed(() =>
    this.expenses().reduce((total, expense) => total + expense.amount, 0),
  );

  transactionCount = computed(() => this.expenses().length);

  highestExpense = computed(() => {
    const expenseList = this.expenses();

    if (expenseList.length === 0) {
      return 0;
    }

    return Math.max(...expenseList.map((expense) => expense.amount));
  });

  averageExpense = computed(() => {
    const count = this.transactionCount();

    if (count === 0) {
      return 0;
    }

    return this.totalExpenses() / count;
  });

  addExpense(expense: Expense) {
    this.expenses.update((currentExpenses) => [...currentExpenses, expense]);
  }

  deleteExpense(id: string) {
    this.expenses.update((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );
  }
}
