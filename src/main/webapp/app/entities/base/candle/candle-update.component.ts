import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import MarketService from '@/entities/base/market/market.service';
import { IMarket } from '@/shared/model/base/market.model';

import { ICandle, Candle } from '@/shared/model/base/candle.model';
import CandleService from './candle.service';

const validations: any = {
  candle: {
    timestampt: {},
    openPrice: {},
    closePrice: {},
    highPrice: {},
    lowPrice: {},
    volume: {},
    transaction: {},
    timeType: {},
  },
};

@Component({
  validations,
})
export default class CandleUpdate extends Vue {
  @Inject('candleService') private candleService: () => CandleService;
  @Inject('alertService') private alertService: () => AlertService;

  public candle: ICandle = new Candle();

  @Inject('marketService') private marketService: () => MarketService;

  public markets: IMarket[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.candleId) {
        vm.retrieveCandle(to.params.candleId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.candle.id) {
      this.candleService()
        .update(this.candle)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Candle is updated with identifier ' + param.id;
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.candleService()
        .create(this.candle)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Candle is created with identifier ' + param.id;
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveCandle(candleId): void {
    this.candleService()
      .find(candleId)
      .then(res => {
        this.candle = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.marketService()
      .retrieve()
      .then(res => {
        this.markets = res.data;
      });
  }
}
