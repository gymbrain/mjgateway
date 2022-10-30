<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="gatewayApp.baseMarket.home.createOrEditLabel" data-cy="MarketCreateUpdateHeading">Create or edit a Market</h2>
        <div>
          <div class="form-group" v-if="market.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="market.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="market-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="market-title"
              data-cy="title"
              :class="{ valid: !$v.market.title.$invalid, invalid: $v.market.title.$invalid }"
              v-model="$v.market.title.$model"
              required
            />
            <div v-if="$v.market.title.$anyDirty && $v.market.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.market.title.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="market-active">Active</label>
            <input
              type="checkbox"
              class="form-check"
              name="active"
              id="market-active"
              data-cy="active"
              :class="{ valid: !$v.market.active.$invalid, invalid: $v.market.active.$invalid }"
              v-model="$v.market.active.$model"
            />
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
            :disabled="$v.market.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./market-update.component.ts"></script>
