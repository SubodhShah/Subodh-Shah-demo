import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Card } from '../card';
import * as cardActions from '../store/card.actions';
import * as cardSelector from '../store/card.selectors';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit, OnDestroy {
  @Input() card: Card;
  private cardStore$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    this.cardStore$ = new Subscription();
  }

  ngOnInit(): void {
    this.cardStore$.add(
      this.store.select(cardSelector.isDeleteSuccess)
        .pipe(filter(done => !!done))
        .subscribe(() => this.snackBar.open('Card deleted!', 'OK', { duration: 2000 })),
    );
  }

  ngOnDestroy(): void {
    this.cardStore$?.unsubscribe();
  }

  onClickRemoveCard(id: string): void {
    this.store.dispatch(cardActions.deleteCard({ id }));
  }

  onCardDetailNavigate(card: Card): void {
    this.router.navigate([card._id], { relativeTo: this.activatedRoute });
  }

}
