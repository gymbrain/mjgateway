/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CandleDetailComponent from '@/entities/base/candle/candle-details.vue';
import CandleClass from '@/entities/base/candle/candle-details.component';
import CandleService from '@/entities/base/candle/candle.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Candle Management Detail Component', () => {
    let wrapper: Wrapper<CandleClass>;
    let comp: CandleClass;
    let candleServiceStub: SinonStubbedInstance<CandleService>;

    beforeEach(() => {
      candleServiceStub = sinon.createStubInstance<CandleService>(CandleService);

      wrapper = shallowMount<CandleClass>(CandleDetailComponent, {
        store,
        localVue,
        router,
        provide: { candleService: () => candleServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCandle = { id: 123 };
        candleServiceStub.find.resolves(foundCandle);

        // WHEN
        comp.retrieveCandle(123);
        await comp.$nextTick();

        // THEN
        expect(comp.candle).toBe(foundCandle);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCandle = { id: 123 };
        candleServiceStub.find.resolves(foundCandle);

        // WHEN
        comp.beforeRouteEnter({ params: { candleId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.candle).toBe(foundCandle);
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
