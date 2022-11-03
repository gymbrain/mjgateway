<template>
  <div>
    <h2 id="page-heading" data-cy="CurrencyHeading">
      <span id="currency-heading">Currencies</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'CurrencyCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-currency"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Currency </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && currencies && currencies.length === 0">
      <span>No currencies found</span>
    </div>
    <div class="table-responsive" v-if="currencies && currencies.length > 0">
      <table class="table table-striped" aria-describedby="currencies">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('title')">
              <span>Title</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'title'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('available')">
              <span>Available</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'available'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('frozen')">
              <span>Frozen</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'frozen'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="currency in currencies" :key="currency.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CurrencyView', params: { currencyId: currency.id } }">{{ currency.id }}</router-link>
            </td>
            <td>{{ currency.title }}</td>
            <td>{{ currency.available }}</td>
            <td>{{ currency.frozen }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CurrencyView', params: { currencyId: currency.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CurrencyEdit', params: { currencyId: currency.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(currency)"
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
        ><span id="gatewayApp.baseCurrency.delete.question" data-cy="currencyDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-currency-heading">Are you sure you want to delete this Currency?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-currency"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeCurrency()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="currencies && currencies.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./currency.component.ts"></script>
