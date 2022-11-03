import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { ICurrency, Currency } from '@/shared/model/base/currency.model';
import CurrencyService from './currency.service';

const validations: any = {
  currency: {
    title: {
      required,
    },
    available: {
      required,
    },
    frozen: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class CurrencyUpdate extends Vue {
  @Inject('currencyService') private currencyService: () => CurrencyService;
  @Inject('alertService') private alertService: () => AlertService;

  public currency: ICurrency = new Currency();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.currencyId) {
        vm.retrieveCurrency(to.params.currencyId);
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
    if (this.currency.id) {
      this.currencyService()
        .update(this.currency)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Currency is updated with identifier ' + param.id;
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
      this.currencyService()
        .create(this.currency)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Currency is created with identifier ' + param.id;
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

  public retrieveCurrency(currencyId): void {
    this.currencyService()
      .find(currencyId)
      .then(res => {
        this.currency = res;
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
