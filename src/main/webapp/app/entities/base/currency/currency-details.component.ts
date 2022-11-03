import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICurrency } from '@/shared/model/base/currency.model';
import CurrencyService from './currency.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CurrencyDetails extends Vue {
  @Inject('currencyService') private currencyService: () => CurrencyService;
  @Inject('alertService') private alertService: () => AlertService;

  public currency: ICurrency = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.currencyId) {
        vm.retrieveCurrency(to.params.currencyId);
      }
    });
  }

  public retrieveCurrency(currencyId) {
    this.currencyService()
      .find(currencyId)
      .then(res => {
        this.currency = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
