export type ExpenseCategory =
  | 'Food'
  | 'Travel'
  | 'Shopping'
  | 'Utilities'
  | 'Work'
  | 'Personal'
  | 'Grocery'
  | 'Other';

export type TransactionType = 'Income' | 'Expense';

export interface Expense {
  id: string;

  title: string;

  amount: number;

  category: ExpenseCategory;

  date: string;

  notes: string;

  type: TransactionType;

  userId?: string;
}
