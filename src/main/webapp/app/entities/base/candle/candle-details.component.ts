import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICandle } from '@/shared/model/base/candle.model';
import CandleService from './candle.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CandleDetails extends Vue {
  @Inject('candleService') private candleService: () => CandleService;
  @Inject('alertService') private alertService: () => AlertService;

  public candle: ICandle = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.candleId) {
        vm.retrieveCandle(to.params.candleId);
      }
    });
  }

  public retrieveCandle(candleId) {
    this.candleService()
      .find(candleId)
      .then(res => {
        this.candle = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
