<template>
  <div>
    <h2 id="page-heading" data-cy="CandleHeading">
      <span id="candle-heading">Candles</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'CandleCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-candle"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Candle </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && candles && candles.length === 0">
      <span>No candles found</span>
    </div>
    <div class="table-responsive" v-if="candles && candles.length > 0">
      <table class="table table-striped" aria-describedby="candles">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('timestampt')">
              <span>Timestampt</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'timestampt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('openPrice')">
              <span>Open Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'openPrice'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('closePrice')">
              <span>Close Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'closePrice'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('highPrice')">
              <span>High Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'highPrice'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('lowPrice')">
              <span>Low Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'lowPrice'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('volume')">
              <span>Volume</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'volume'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('transaction')">
              <span>Transaction</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'transaction'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('timeType')">
              <span>Time Type</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'timeType'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('market.title')">
              <span>Market</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'market.title'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candle in candles" :key="candle.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CandleView', params: { candleId: candle.id } }">{{ candle.id }}</router-link>
            </td>
            <td>{{ candle.timestampt }}</td>
            <td>{{ candle.openPrice }}</td>
            <td>{{ candle.closePrice }}</td>
            <td>{{ candle.highPrice }}</td>
            <td>{{ candle.lowPrice }}</td>
            <td>{{ candle.volume }}</td>
            <td>{{ candle.transaction }}</td>
            <td>{{ candle.timeType }}</td>
            <td>
              <div v-if="candle.market">
                <router-link :to="{ name: 'MarketView', params: { marketId: candle.market.id } }">{{ candle.market.title }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CandleView', params: { candleId: candle.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CandleEdit', params: { candleId: candle.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(candle)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="gatewayApp.baseCandle.delete.question" data-cy="candleDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-candle-heading">Are you sure you want to delete this Candle?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-candle"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeCandle()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="candles && candles.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./candle.component.ts"></script>
