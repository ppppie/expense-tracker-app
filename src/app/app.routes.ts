import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { AddExpense } from './components/add-expense/add-expense';
import { ExpenseList } from './components/expense-list/expense-list';
import { EditExpense } from './components/edit-expense/edit-expense';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'add',
    component: AddExpense,
  },
  {
    path: 'expenses',
    component: ExpenseList,
  },
  {
    path: 'edit/:id',
    component: EditExpense,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
];
