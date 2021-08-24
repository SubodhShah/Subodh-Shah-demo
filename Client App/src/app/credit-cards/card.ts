export type CardId = 'id';

export interface Card {
  _id: string;
  firstName:string;
  lastName:string;
  cardNumber:string;
  expiryDate: string;
  cVV:string;
}
