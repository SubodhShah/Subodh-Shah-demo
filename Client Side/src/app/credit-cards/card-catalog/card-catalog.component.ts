import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Card } from '../card';
import * as cardActions from '../store/card.actions';
import * as cardSelector from '../store/card.selectors';

@Component({
  selector: 'app-card-catalog',
  templateUrl: './card-catalog.component.html',
  styleUrls: ['./card-catalog.component.scss']
})
export class CardCatalogComponent implements OnInit, OnDestroy {
  cards: Card[] = [];
  private cardStore$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private store: Store<{ cards }>
  ) {
    let a=cardActions.findAllCards();
    debugger;
    this.store.dispatch(cardActions.findAllCards());
  }

  ngOnInit(): void {
    this.cardStore$ = this.store.select(cardSelector.selectAllCards)
      .subscribe((cards) => {
        this.cards = [...cards];
      });
  }

  ngOnDestroy(): void {
    this.cardStore$?.unsubscribe();
  }

  onNavigateToCreateCardView(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

}
