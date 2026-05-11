export type ExpenseCategory =
  | 'Work'
  | 'Personal'
  | 'Grocery'
  | 'Utilities'
  | 'Shopping'
  | 'Travel'
  | 'Food'
  | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
}
