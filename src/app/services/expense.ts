import { Injectable, computed, effect, signal } from '@angular/core';
import { Expense, ExpenseCategory } from '../../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor() {
    const savedExpenses = localStorage.getItem('expenses');

    if (savedExpenses) {
      this.expenses.set(JSON.parse(savedExpenses));
    }

    effect(() => {
      localStorage.setItem('expenses', JSON.stringify(this.expenses()));
    });
  }

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

  //for editing an expense, we update the expense with the same id as the updatedExpense with the new values from updatedExpense
  updateExpense(updatedExpense: Expense) {
    this.expenses.update((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense,
      ),
    );
  }
  //get an expense by id, used for editing an expense to get the current values of the expense before updating it
  getExpenseById(id: string) {
    return this.expenses().find((expense) => expense.id === id);
  }
}
