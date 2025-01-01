export interface IForm {
  numPeople: number;
  tableType: "medium" | "large";
  paymentMethod: "card" | "cash";
  baseFee: number;
  isDiscount: boolean;
  beerCount: number;
  sojuCount: number;
}
