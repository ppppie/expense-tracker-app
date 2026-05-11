import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense';
import { ExpenseCategory, TransactionType } from '../../../models/expense.model';

@Component({
  selector: 'app-edit-expense',
  imports: [FormsModule],
  templateUrl: './edit-expense.html',
  styleUrl: './edit-expense.css',
})
export class EditExpense {
  expenseService = inject(ExpenseService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  expenseId = '';

  title = '';
  amount = 0;
  category: ExpenseCategory = 'Other';

  date = '';
  notes = '';
  type: TransactionType = 'Expense';

  // Initialize the form with the existing expense data -- ai suggestion
  constructor() {
    this.expenseId = this.route.snapshot.paramMap.get('id') ?? '';

    const expense = this.expenseService.getExpenseById(this.expenseId);

    if (expense) {
      this.title = expense.title;
      this.amount = expense.amount;
      this.category = expense.category;

      this.date = expense.date;
      this.notes = expense.notes;
      this.type = expense.type;
    }
  }

  updateExpense() {
    this.expenseService.updateExpense({
      id: this.expenseId,
      title: this.title,
      amount: this.amount,
      category: this.category,
      date: this.date,
      notes: this.notes,
      type: this.type,
    });

    this.router.navigate(['/expenses']);
  }
}
