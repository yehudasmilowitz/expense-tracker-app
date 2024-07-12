export default interface Transaction {
  id: string;
  text: string;
  amount: number;
  createdAt: Date;
  userId: string;
}
