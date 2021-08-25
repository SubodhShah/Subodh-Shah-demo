import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CardsRoutingModule } from './card-router.module';
import { CardStoreModule } from './store/card-store.module';

import { CardsComponent } from './cards.component';
import { CreditCardComponent } from './credit-card/credit-card.component';

@NgModule({
  declarations: [
    CardsComponent,
    CreditCardComponent,
    ...CardsRoutingModule.components
  ],
  imports: [
    CardsRoutingModule,
    CardStoreModule,
    SharedModule,
  ],
  exports: [CardsComponent]
})
export class CardModule { }
