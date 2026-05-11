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
  firestore = inject(Firestore);

  expenseCollection = collection(this.firestore, 'expenses');

  constructor() {
    collectionData(this.expenseCollection, {
      idField: 'id',
    }).subscribe((data) => {
      this.expenses.set(data as Expense[]);
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

  //delete an expense by id, we use the id to get the document reference and then delete the document
  async deleteExpense(id: string) {
    const expenseDoc = doc(this.firestore, `expenses/${id}`);

    await deleteDoc(expenseDoc);
  }

  //update an expense by id, we use the id to get the document reference and then update the document with the new values of the expense
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
  //get an expense by id, used for editing an expense to get the current values of the expense before updating it
  getExpenseById(id: string) {
    return this.expenses().find((expense) => expense.id === id);
  }
}
