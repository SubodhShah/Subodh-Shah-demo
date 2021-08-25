import { createAction, props } from '@ngrx/store';
import { Card, CardId } from '../card';

export enum type {
  SELECT_CARD            = '[ Card ] Select a Card',
  FIND_ALL_CARD         = '[ Card ] Find All Card',
  FIND_ALL_CARD_FAIL    = '[ Card ] Find All Card Fail',
  FIND_ALL_CARD_SUCCESS = '[ Card ] Find All Card Success',
  FIND_ONE_CARD          = '[ Card ] Find One Card',
  FIND_ONE_CARD_FAIL     = '[ Card ] Find One Card Fail',
  FIND_ONE_CARD_SUCCESS  = '[ Card ] Find One Card Success',
  CREATE_CARD            = '[ Card ] Create Card',
  CREATE_CARD_FAIL       = '[ Card ] Create Card Fail',
  CREATE_CARD_SUCCESS    = '[ Card ] Create Card Success',
  UPDATE_CARD            = '[ Card ] Update Card',
  UPDATE_CARD_FAIL       = '[ Card ] Update Card Fail',
  UPDATE_CARD_SUCCESS    = '[ Card ] Update Card Success',
  PATCH_CARD             = '[ Card ] Patch Card',
  PATCH_CARD_FAIL        = '[ Card ] Patch Card Fail',
  PATCH_CARD_SUCCESS     = '[ Card ] Patch Card Success',
  DELETE_CARD            = '[ Card ] Delete Card',
  DELETE_CARD_FAIL       = '[ Card ] Delete Card Fail',
  DELETE_CARD_SUCCESS    = '[ Card ] Delete Card Success',
}

export const SelectCard         = createAction(type.SELECT_CARD, props<{ id: string }>());
export const findAllCards        = createAction(type.FIND_ALL_CARD);
export const findAllCardsFail    = createAction(type.FIND_ALL_CARD_FAIL, props<{ error: any }>());
export const findAllCardsSuccess = createAction(type.FIND_ALL_CARD_SUCCESS, props<{ cards: Array<Card> }>());
export const findOneCard       = createAction(type.FIND_ONE_CARD, props<{ id: string }>());
export const findOneCardFail     = createAction(type.FIND_ONE_CARD_FAIL, props<{ error: any }>());
export const findOneSuccess      = createAction(type.FIND_ONE_CARD_SUCCESS, props<{ card: Card }>());
export const createCard         = createAction(type.CREATE_CARD, props<{ card: Omit<Card, CardId> }>());
export const createCardFail      = createAction(type.CREATE_CARD_FAIL, props<{ error: any }>());
export const createCardSuccess   = createAction(type.CREATE_CARD_SUCCESS, props<{ card: Card }>());
export const updateCard         = createAction(type.UPDATE_CARD, props<{ card: Card }>());
export const updateCardFail      = createAction(type.UPDATE_CARD_FAIL, props<{ error: any }>());
export const updateCardSuccess   = createAction(type.UPDATE_CARD_SUCCESS, props<{ card: Card }>());
export const patchCard           = createAction(type.PATCH_CARD, props<{ id: string, card: Partial<Card> }>());
export const patchCardFail       = createAction(type.PATCH_CARD_FAIL, props<{ error: any }>());
export const patchCardSuccess    = createAction(type.PATCH_CARD_SUCCESS, props<{ card: Card }>());
export const deleteCard         = createAction(type.DELETE_CARD, props<{ id: string }>());
export const deleteCardFail      = createAction(type.DELETE_CARD_FAIL, props<{ error: any }>());
export const deleteCardSuccess   = createAction(type.DELETE_CARD_SUCCESS, props<{ id: string }>());
