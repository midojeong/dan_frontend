export type Invoice = {
  id: number;
  student: number;
  amount: number;
  cash: number;
  card: number;
  transfer: number;
  cardSettled: boolean;
  transferSettled: boolean;
  published: boolean;
  publishedAt: string;
  settled: boolean;
  settledAt: string;
  detail: string;
  visible: boolean;
}
