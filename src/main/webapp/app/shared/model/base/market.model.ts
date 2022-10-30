export interface IMarket {
  id?: number;
  title?: string;
  active?: boolean | null;
}

export class Market implements IMarket {
  constructor(public id?: number, public title?: string, public active?: boolean | null) {
    this.active = this.active ?? false;
  }
}
