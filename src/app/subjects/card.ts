export class Card {
  public id: number;
  public answer: string;
  public question: string;
  public lastProcessed: Date;
  public tray: number;
  public isEditingActivated = false;
}
