import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMarket } from '@/shared/model/base/market.model';
import MarketService from './market.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class MarketDetails extends Vue {
  @Inject('marketService') private marketService: () => MarketService;
  @Inject('alertService') private alertService: () => AlertService;

  public market: IMarket = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.marketId) {
        vm.retrieveMarket(to.params.marketId);
      }
    });
  }

  public retrieveMarket(marketId) {
    this.marketService()
      .find(marketId)
      .then(res => {
        this.market = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
