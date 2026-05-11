import { Component, inject } from '@angular/core';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  expenseService = inject(ExpenseService);
}
