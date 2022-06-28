export interface BonusCode {
  id: string | null;
  numberOfTokens: number | null;
  numberOfDays: number | null;
  expirationTime: string | null;
  isUsed: boolean | null;
  createDateTime: string | null;
}
