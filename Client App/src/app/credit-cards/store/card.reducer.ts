import { Action, createReducer, on } from '@ngrx/store';
import * as cardState from './card.state';
import * as cardActions from './card.actions';

const cardReducer = createReducer(
  cardState.initialstate,
  // SELECT ONE
  on(cardActions.SelectCard, (state, { id }) => ({
    ...state,
    selectedId: id
  })),
  // FIND ALL
  on(cardActions.findAllCards, (state) => ({
    ...state,
    action: cardActions.type.FIND_ALL_CARD,
    loading: true,
    error: null,
  })),
  on(cardActions.findAllCardsSuccess, (state, { cards }) => {
    return cardState.adapter.addAll(cards, {
      ...state,
      loading: false,
    });
  }),
  on(cardActions.findAllCardsFail, (state, { error }) => ({
    ...state,
    error: {...error},
    loading: false,
  })),
  // FIND ONE
  on(cardActions.findOneCard, (state) => ({
    ...state,
    action: cardActions.type.FIND_ONE_CARD,
    loading: true,
    error: null,
  })),
  on(cardActions.findOneSuccess, (state, { card }) => {
    return cardState.adapter.setOne(card, {
      ...state,
      loading: false,
    });
  }),
  on(cardActions.findOneCardFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // CREATE
  on(cardActions.createCard, (state) => ({
    ...state,
    action: cardActions.type.CREATE_CARD,
    loading: true,
    error: null,
  })),
  on(cardActions.createCardSuccess, (state, { card }) => {
    return cardState.adapter.addOne(card, {
      ...state,
      loading: false,
    });
  }),
  on(cardActions.createCardFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // UPDATE
  on(cardActions.updateCard, (state) => ({
    ...state,
    action: cardActions.type.UPDATE_CARD,
    loading: true,
    error: null,
  })),
  on(cardActions.updateCardSuccess, (state, { card }) => {
    return cardState.adapter.updateOne({ id: card._id, changes: card }, {
      ...state,
      loading: false,
    });
  }),
  on(cardActions.updateCardFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // PATCH
  on(cardActions.patchCard, (state) => ({
    ...state,
    action: cardActions.type.PATCH_CARD,
    loading: true,
    error: null,
  })),
  on(cardActions.patchCardSuccess, (state, { card }) => {
    return cardState.adapter.updateOne({ id: card._id, changes: card }, {
      ...state,
      loading: false,
    });
  }),
  on(cardActions.patchCardFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // DELETE
  on(cardActions.deleteCard, (state) => ({
    ...state,
    action: cardActions.type.DELETE_CARD,
    loading: true,
    error: null,
  })),
  on(cardActions.deleteCardSuccess, (state, { id }) => {
    return cardState.adapter.removeOne(id, {
      ...state,
      loading: false,
    });
  }),
  on(cardActions.patchCardFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
);

export function reducer(state: cardState.CardsState, action: Action) {
  return cardReducer(state, action);
}
