/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CandleUpdateComponent from '@/entities/base/candle/candle-update.vue';
import CandleClass from '@/entities/base/candle/candle-update.component';
import CandleService from '@/entities/base/candle/candle.service';

import MarketService from '@/entities/base/market/market.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Candle Management Update Component', () => {
    let wrapper: Wrapper<CandleClass>;
    let comp: CandleClass;
    let candleServiceStub: SinonStubbedInstance<CandleService>;

    beforeEach(() => {
      candleServiceStub = sinon.createStubInstance<CandleService>(CandleService);

      wrapper = shallowMount<CandleClass>(CandleUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          candleService: () => candleServiceStub,
          alertService: () => new AlertService(),

          marketService: () =>
            sinon.createStubInstance<MarketService>(MarketService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.candle = entity;
        candleServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(candleServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.candle = entity;
        candleServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(candleServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCandle = { id: 123 };
        candleServiceStub.find.resolves(foundCandle);
        candleServiceStub.retrieve.resolves([foundCandle]);

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
