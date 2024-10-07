// types/Invoice.ts
export interface Invoice {
  id: number;
  customerName: string;
  amount: number;
  status: boolean;
  date: string; // ISO date string
}
