import { Injectable, computed, signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Expense, ExpenseCategory } from '../../models/expense.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  // Firebase / Firestore
  firestore = inject(Firestore);

  expenseCollection = collection(this.firestore, 'expenses');

  constructor() {
    collectionData(this.expenseCollection, {
      idField: 'id',
    }).subscribe((data) => {
      this.expenses.set(data as Expense[]);
    });
  }

  // Expense Data
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

  // Filter / Search Signals
  selectedCategory = signal<string>('All');

  selectedType = signal<string>('All');

  selectedSort = signal<string>('Default');

  selectedDate = signal<string>('');

  searchText = signal<string>('');

  //dashboard enhancement dashboad card toggles
  selectedDashboardCard = signal<string>('');
  toggleDashboardCard(card: string) {
    if (this.selectedDashboardCard() === card) {
      this.selectedDashboardCard.set('');

      return;
    }

    this.selectedDashboardCard.set(card);
  }

  // Filtered Expenses
  filteredExpenses = computed(() => {
    let filtered = this.expenses().filter((expense) => {
      const matchesCategory =
        this.selectedCategory() === 'All' || expense.category === this.selectedCategory();

      const matchesType = this.selectedType() === 'All' || expense.type === this.selectedType();

      const matchesDate = this.selectedDate() === '' || expense.date === this.selectedDate();

      const matchesSearch = expense.title.toLowerCase().includes(this.searchText().toLowerCase());

      return matchesCategory && matchesType && matchesDate && matchesSearch;
    });

    if (this.selectedSort() === 'Newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    if (this.selectedSort() === 'Oldest') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return filtered;
  });

  // Dashboard Statistics
  totalExpenses = computed(() =>
    this.expenses().reduce((total, expense) => total + expense.amount, 0),
  );

  transactionCount = computed(() => this.expenses().length);

  totalIncome = computed(() =>
    this.expenses()
      .filter((expense) => expense.type === 'Income')
      .reduce((total, expense) => total + expense.amount, 0),
  );

  totalExpenseAmount = computed(() =>
    this.expenses()
      .filter((expense) => expense.type === 'Expense')
      .reduce((total, expense) => total + expense.amount, 0),
  );

  currentBalance = computed(() => this.totalIncome() - this.totalExpenseAmount());

  incomeExpenseRatio = computed(() => {
    const expenses = this.totalExpenseAmount();

    if (expenses === 0) {
      return 0;
    }

    return this.totalIncome() / expenses;
  });

  expenseCategoryTotals = computed(() => {
    const totals: Record<string, number> = {};

    this.expenses()

      .filter((expense) => expense.type === 'Expense')

      .forEach((expense) => {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      });

    return Object.entries(totals)

      .sort((a, b) => b[1] - a[1]);
  });

  transactionCategoryCounts = computed(() => {
    const counts: Record<string, number> = {};

    this.expenses()

      .forEach((expense) => {
        counts[expense.category] = (counts[expense.category] || 0) + 1;
      });

    return Object.entries(counts)

      .sort((a, b) => b[1] - a[1]);
  });

  incomeCategoryTotals = computed(() => {
    const totals: Record<string, number> = {};

    this.expenses()

      .filter((expense) => expense.type === 'Income')

      .forEach((expense) => {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      });

    return Object.entries(totals)

      .sort((a, b) => b[1] - a[1]);
  });

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

  // Add Expense
  async addExpense(expense: Expense) {
    await addDoc(this.expenseCollection, {
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      notes: expense.notes,
      type: expense.type,
    });
  }

  // Delete Expense
  async deleteExpense(id: string) {
    const expenseDoc = doc(this.firestore, `expenses/${id}`);

    await deleteDoc(expenseDoc);
  }

  // Update Expense
  async updateExpense(updatedExpense: Expense) {
    const expenseDoc = doc(this.firestore, `expenses/${updatedExpense.id}`);

    await updateDoc(expenseDoc, {
      title: updatedExpense.title,
      amount: updatedExpense.amount,
      category: updatedExpense.category,
      date: updatedExpense.date,
      notes: updatedExpense.notes,
      type: updatedExpense.type,
    });
  }

  // Get Expense By ID
  getExpenseById(id: string) {
    return this.expenses().find((expense) => expense.id === id);
  }
}
