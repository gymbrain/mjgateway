import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Market = () => import('@/entities/base/market/market.vue');
// prettier-ignore
const MarketUpdate = () => import('@/entities/base/market/market-update.vue');
// prettier-ignore
const MarketDetails = () => import('@/entities/base/market/market-details.vue');
// prettier-ignore
const Candle = () => import('@/entities/base/candle/candle.vue');
// prettier-ignore
const CandleUpdate = () => import('@/entities/base/candle/candle-update.vue');
// prettier-ignore
const CandleDetails = () => import('@/entities/base/candle/candle-details.vue');
// prettier-ignore
const Currency = () => import('@/entities/base/currency/currency.vue');
// prettier-ignore
const CurrencyUpdate = () => import('@/entities/base/currency/currency-update.vue');
// prettier-ignore
const CurrencyDetails = () => import('@/entities/base/currency/currency-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'market',
      name: 'Market',
      component: Market,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'market/new',
      name: 'MarketCreate',
      component: MarketUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'market/:marketId/edit',
      name: 'MarketEdit',
      component: MarketUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'market/:marketId/view',
      name: 'MarketView',
      component: MarketDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'candle',
      name: 'Candle',
      component: Candle,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'candle/new',
      name: 'CandleCreate',
      component: CandleUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'candle/:candleId/edit',
      name: 'CandleEdit',
      component: CandleUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'candle/:candleId/view',
      name: 'CandleView',
      component: CandleDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'currency',
      name: 'Currency',
      component: Currency,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'currency/new',
      name: 'CurrencyCreate',
      component: CurrencyUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'currency/:currencyId/edit',
      name: 'CurrencyEdit',
      component: CurrencyUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'currency/:currencyId/view',
      name: 'CurrencyView',
      component: CurrencyDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
