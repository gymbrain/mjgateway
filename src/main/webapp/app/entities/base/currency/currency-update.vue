<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="gatewayApp.baseCurrency.home.createOrEditLabel" data-cy="CurrencyCreateUpdateHeading">Create or edit a Currency</h2>
        <div>
          <div class="form-group" v-if="currency.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="currency.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="currency-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="currency-title"
              data-cy="title"
              :class="{ valid: !$v.currency.title.$invalid, invalid: $v.currency.title.$invalid }"
              v-model="$v.currency.title.$model"
              required
            />
            <div v-if="$v.currency.title.$anyDirty && $v.currency.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.currency.title.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="currency-available">Available</label>
            <input
              type="text"
              class="form-control"
              name="available"
              id="currency-available"
              data-cy="available"
              :class="{ valid: !$v.currency.available.$invalid, invalid: $v.currency.available.$invalid }"
              v-model="$v.currency.available.$model"
              required
            />
            <div v-if="$v.currency.available.$anyDirty && $v.currency.available.$invalid">
              <small class="form-text text-danger" v-if="!$v.currency.available.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="currency-frozen">Frozen</label>
            <input
              type="text"
              class="form-control"
              name="frozen"
              id="currency-frozen"
              data-cy="frozen"
              :class="{ valid: !$v.currency.frozen.$invalid, invalid: $v.currency.frozen.$invalid }"
              v-model="$v.currency.frozen.$model"
              required
            />
            <div v-if="$v.currency.frozen.$anyDirty && $v.currency.frozen.$invalid">
              <small class="form-text text-danger" v-if="!$v.currency.frozen.required"> This field is required. </small>
            </div>
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
            :disabled="$v.currency.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./currency-update.component.ts"></script>
