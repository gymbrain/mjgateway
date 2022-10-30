<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="candle">
        <h2 class="jh-entity-heading" data-cy="candleDetailsHeading"><span>Candle</span> {{ candle.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Timestampt</span>
          </dt>
          <dd>
            <span>{{ candle.timestampt }}</span>
          </dd>
          <dt>
            <span>Open Price</span>
          </dt>
          <dd>
            <span>{{ candle.openPrice }}</span>
          </dd>
          <dt>
            <span>Close Price</span>
          </dt>
          <dd>
            <span>{{ candle.closePrice }}</span>
          </dd>
          <dt>
            <span>High Price</span>
          </dt>
          <dd>
            <span>{{ candle.highPrice }}</span>
          </dd>
          <dt>
            <span>Low Price</span>
          </dt>
          <dd>
            <span>{{ candle.lowPrice }}</span>
          </dd>
          <dt>
            <span>Volume</span>
          </dt>
          <dd>
            <span>{{ candle.volume }}</span>
          </dd>
          <dt>
            <span>Transaction</span>
          </dt>
          <dd>
            <span>{{ candle.transaction }}</span>
          </dd>
          <dt>
            <span>Time Type</span>
          </dt>
          <dd>
            <span>{{ candle.timeType }}</span>
          </dd>
          <dt>
            <span>Market</span>
          </dt>
          <dd>
            <div v-if="candle.market">
              <router-link :to="{ name: 'MarketView', params: { marketId: candle.market.id } }">{{ candle.market.title }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="candle.id" :to="{ name: 'CandleEdit', params: { candleId: candle.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./candle-details.component.ts"></script>
