export interface ICurrency {
  id?: number;
  title?: string;
  available?: string;
  frozen?: string;
}

export class Currency implements ICurrency {
  constructor(public id?: number, public title?: string, public available?: string, public frozen?: string) {}
}
