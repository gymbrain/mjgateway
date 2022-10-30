/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import MarketDetailComponent from '@/entities/base/market/market-details.vue';
import MarketClass from '@/entities/base/market/market-details.component';
import MarketService from '@/entities/base/market/market.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Market Management Detail Component', () => {
    let wrapper: Wrapper<MarketClass>;
    let comp: MarketClass;
    let marketServiceStub: SinonStubbedInstance<MarketService>;

    beforeEach(() => {
      marketServiceStub = sinon.createStubInstance<MarketService>(MarketService);

      wrapper = shallowMount<MarketClass>(MarketDetailComponent, {
        store,
        localVue,
        router,
        provide: { marketService: () => marketServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMarket = { id: 123 };
        marketServiceStub.find.resolves(foundMarket);

        // WHEN
        comp.retrieveMarket(123);
        await comp.$nextTick();

        // THEN
        expect(comp.market).toBe(foundMarket);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMarket = { id: 123 };
        marketServiceStub.find.resolves(foundMarket);

        // WHEN
        comp.beforeRouteEnter({ params: { marketId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.market).toBe(foundMarket);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
