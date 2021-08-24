import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardsState, featureKey, adapter } from './card.state';
import * as cardActions from './card.actions';

const {
  selectEntities,
  selectAll
} = adapter.getSelectors();

const getCardState = createFeatureSelector<CardsState>(featureKey);

const selectCardEntities = createSelector(getCardState, selectEntities);

const selectCardSensorId = createSelector(getCardState, (state: CardsState) => state.selectedId);

export const selectAllCards = createSelector(getCardState, selectAll);

export const selectCurrentCard = createSelector(
  selectCardEntities,
  selectCardSensorId,
  (userEntities, userId) => userEntities[userId]
);

export const isCreateSuccess = createSelector(getCardState, (state: CardsState) =>
  state.action === cardActions.type.CREATE_CARD && !state.loading && !state.error);

export const isUpdateSuccess = createSelector(getCardState, (state: CardsState) =>
  state.action === cardActions.type.UPDATE_CARD && !state.loading && !state.error);

export const isDeleteSuccess = createSelector(getCardState, (state: CardsState) =>
  state.action === cardActions.type.DELETE_CARD && !state.loading && !state.error);
