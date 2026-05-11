import { Component, inject } from '@angular/core';
import { ExpenseService } from '../../services/expense';
import { ExpenseItem } from '../expense-item/expense-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  imports: [ExpenseItem, FormsModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList {
  expenseService = inject(ExpenseService);
}
