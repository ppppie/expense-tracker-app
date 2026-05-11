import { Component, inject, computed } from '@angular/core';
import { ExpenseService } from '../../services/expense';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  pieChartData = computed<ChartData<'pie'>>(() => ({
    labels: this.expenseService.expenseCategoryTotals().map((category) => category[0]),

    datasets: [
      {
        data: this.expenseService.expenseCategoryTotals().map((category) => category[1]),

        backgroundColor: [
          '#0d6efd',
          '#ffc107',
          '#dc3545',
          '#0dcaf0',
          '#6f42c1',
          '#fd7e14',
          '#6c757d',
          '#198754',
        ],

        borderWidth: 2,
      },
    ],
  }));

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,

    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  expenseService = inject(ExpenseService);
}
