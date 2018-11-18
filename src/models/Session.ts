export type PaymentState = "Fulfilled" | "NeedToBePaid" | "NeedToBeRefund";

export type Session = {
  id: number;
  attendance: number;
  discount: number;
  discountReason: string;
  active: boolean;
  paymentState: PaymentState;
  charged: number;
  paid: number;
  net: number;
  schedule: number;
  course: number;
  student: number;
  detail: string;
  visible: boolean;
}
