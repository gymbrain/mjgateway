import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { IMarket, Market } from '@/shared/model/base/market.model';
import MarketService from './market.service';

const validations: any = {
  market: {
    title: {
      required,
    },
    active: {},
  },
};

@Component({
  validations,
})
export default class MarketUpdate extends Vue {
  @Inject('marketService') private marketService: () => MarketService;
  @Inject('alertService') private alertService: () => AlertService;

  public market: IMarket = new Market();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.marketId) {
        vm.retrieveMarket(to.params.marketId);
      }
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
    if (this.market.id) {
      this.marketService()
        .update(this.market)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Market is updated with identifier ' + param.id;
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
      this.marketService()
        .create(this.market)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Market is created with identifier ' + param.id;
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

  public retrieveMarket(marketId): void {
    this.marketService()
      .find(marketId)
      .then(res => {
        this.market = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
