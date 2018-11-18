import { Session } from "./Session";

export type Payment = {
  id: number;
  amount: number;
  session: number;
  invoice: number;
  Session: Session;
  detail: string;
  visible: boolean;
}
