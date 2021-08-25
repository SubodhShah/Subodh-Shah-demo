import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CardEffects } from './card.effects';
import { reducer } from './card.reducer';
import { featureKey } from './card.state';

@NgModule({
  imports: [
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([CardEffects])
  ]
})
export class CardStoreModule { }
