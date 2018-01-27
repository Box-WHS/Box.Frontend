import { Card } from './card';

export class Tray {
  public id: number;
  public name: string;
  public interval: Date;
  public boxId: number;
  public cards: Card[];
  public expanded = false;
}
