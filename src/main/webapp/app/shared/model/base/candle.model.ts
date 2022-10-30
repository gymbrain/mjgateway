import { IMarket } from '@/shared/model/base/market.model';

export interface ICandle {
  id?: number;
  timestampt?: number | null;
  openPrice?: string | null;
  closePrice?: string | null;
  highPrice?: string | null;
  lowPrice?: string | null;
  volume?: string | null;
  transaction?: string | null;
  timeType?: string | null;
  market?: IMarket | null;
}

export class Candle implements ICandle {
  constructor(
    public id?: number,
    public timestampt?: number | null,
    public openPrice?: string | null,
    public closePrice?: string | null,
    public highPrice?: string | null,
    public lowPrice?: string | null,
    public volume?: string | null,
    public transaction?: string | null,
    public timeType?: string | null,
    public market?: IMarket | null
  ) {}
}
