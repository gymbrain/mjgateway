<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="gatewayApp.baseCandle.home.createOrEditLabel" data-cy="CandleCreateUpdateHeading">Create or edit a Candle</h2>
        <div>
          <div class="form-group" v-if="candle.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="candle.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="candle-timestampt">Timestampt</label>
            <input
              type="number"
              class="form-control"
              name="timestampt"
              id="candle-timestampt"
              data-cy="timestampt"
              :class="{ valid: !$v.candle.timestampt.$invalid, invalid: $v.candle.timestampt.$invalid }"
              v-model.number="$v.candle.timestampt.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="candle-openPrice">Open Price</label>
            <input
              type="text"
              class="form-control"
              name="openPrice"
              id="candle-openPrice"
              data-cy="openPrice"
              :class="{ valid: !$v.candle.openPrice.$invalid, invalid: $v.candle.openPrice.$invalid }"
              v-model="$v.candle.openPrice.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="candle-closePrice">Close Price</label>
            <input
              type="text"
              class="form-control"
              name="closePrice"
              id="candle-closePrice"
              data-cy="closePrice"
              :class="{ valid: !$v.candle.closePrice.$invalid, invalid: $v.candle.closePrice.$invalid }"
              v-model="$v.candle.closePrice.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="candle-highPrice">High Price</label>
            <input
              type="text"
              class="form-control"
              name="highPrice"
              id="candle-highPrice"
              data-cy="highPrice"
              :class="{ valid: !$v.candle.highPrice.$invalid, invalid: $v.candle.highPrice.$invalid }"
              v-model="$v.candle.highPrice.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="candle-lowPrice">Low Price</label>
            <input
              type="text"
              class="form-control"
              name="lowPrice"
              id="candle-lowPrice"
              data-cy="lowPrice"
              :class="{ valid: !$v.candle.lowPrice.$invalid, invalid: $v.candle.lowPrice.$invalid }"
              v-model="$v.candle.lowPrice.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="candle-volume">Volume</label>
            <input
              type="text"
              class="form-control"
              name="volume"
              id="candle-volume"
              data-cy="volume"
              :class="{ valid: !$v.candle.volume.$invalid, invalid: $v.candle.volume.$invalid }"
              v-model="$v.candle.volume.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="candle-transaction">Transaction</label>
            <input
              type="text"
              class="form-control"
              name="transaction"
              id="candle-transaction"
              data-cy="transaction"
              :class="{ valid: !$v.candle.transaction.$invalid, invalid: $v.candle.transaction.$invalid }"
              v-model="$v.candle.transaction.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="candle-timeType">Time Type</label>
            <input
              type="text"
              class="form-control"
              name="timeType"
              id="candle-timeType"
              data-cy="timeType"
              :class="{ valid: !$v.candle.timeType.$invalid, invalid: $v.candle.timeType.$invalid }"
              v-model="$v.candle.timeType.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="candle-market">Market</label>
            <select class="form-control" id="candle-market" data-cy="market" name="market" v-model="candle.market">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="candle.market && marketOption.id === candle.market.id ? candle.market : marketOption"
                v-for="marketOption in markets"
                :key="marketOption.id"
              >
                {{ marketOption.title }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.candle.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./candle-update.component.ts"></script>
