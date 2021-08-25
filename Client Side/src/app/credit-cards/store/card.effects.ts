import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CardService } from '../card.service';
import * as cardActions from './card.actions';

@Injectable()
export class CardEffects {

  findAllCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.findAllCards),
      switchMap(() =>
        this.cardService.findAll().pipe(
          map((cards) => cardActions.findAllCardsSuccess({ cards })),
          catchError((error) => of(cardActions.findAllCardsFail({ error })))
        )
      )
    )
  );

  findOneById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.findOneCard),
      switchMap((action) =>
        this.cardService.findById(action.id).pipe(
          map((card) => cardActions.findOneSuccess({ card })),
          catchError((error) => of(cardActions.findOneCardFail({ error })))
        )
      )
    )
  );

  createCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.createCard),
      switchMap((action) =>
        this.cardService.create(action.card).pipe(
          map((card) => cardActions.createCardSuccess({ card })),
          catchError((error) => of(cardActions.createCardFail({ error })))
        )
      )
    )
  );

  updateCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.updateCard),
      switchMap((action) =>
        this.cardService.update(action.card).pipe(
          map((card) => cardActions.updateCardSuccess({ card })),
          catchError((error) => of(cardActions.updateCardFail({ error })))
        )
      )
    )
  );

  patchCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.patchCard),
      switchMap((action) =>
        this.cardService.partialUpdate(action.id, action.card).pipe(
          map((card) => cardActions.patchCardSuccess({ card })),
          catchError((error) => of(cardActions.patchCardFail({ error })))
        )
      )
    )
  );

  deleteCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.deleteCard),
      switchMap((action) =>
        this.cardService.delete(action.id).pipe(
          map(() => cardActions.deleteCardSuccess({ id: action.id })),
          catchError((error) => of(cardActions.deleteCardFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cardService: CardService
  ) {}
}
