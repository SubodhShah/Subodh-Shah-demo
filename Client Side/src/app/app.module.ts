import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes,ActivatedRoute } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { CardModule } from './credit-cards/cards.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {CardService} from './../../src/app/credit-cards/card.service'

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'card', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CardModule,
    SharedModule,
    RouterModule.forRoot(APP_ROUTES, { useHash: true, relativeLinkResolution: 'legacy' }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
