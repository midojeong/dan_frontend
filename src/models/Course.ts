import { Teacher } from "./Teacher";

export type Course = {
  id: number;
  name: string;
  price: number;
  detail: string;
  contract: number;
  contractType: string;
  visible: boolean;
  teacher?: number;
  Teacher?: Teacher;
}
