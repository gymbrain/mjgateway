import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import MarketService from './base/market/market.service';
import CandleService from './base/candle/candle.service';
import CurrencyService from './base/currency/currency.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('marketService') private marketService = () => new MarketService();
  @Provide('candleService') private candleService = () => new CandleService();
  @Provide('currencyService') private currencyService = () => new CurrencyService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
