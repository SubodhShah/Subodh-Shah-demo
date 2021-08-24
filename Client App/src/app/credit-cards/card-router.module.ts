import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardFormComponent } from './card-form/card-form.component';
import { CardCatalogComponent } from './card-catalog/card-catalog.component';

export const CardRoutes: Routes = [
  {
    path: 'card',
    children: [
      {
        path: '',
        component: CardCatalogComponent
      },
      {
        path: 'create',
        component: CardFormComponent
      },
      {
        path: ':id',
        component: CardFormComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(CardRoutes)],
  exports: [RouterModule]
})

export class CardsRoutingModule {
  static components = [ CardFormComponent, CardCatalogComponent];
}
