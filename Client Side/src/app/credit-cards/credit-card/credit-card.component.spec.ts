import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/card.reducer';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { CreditCardComponent } from './credit-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { CardFormComponent } from '../card-form/card-form.component';


describe('CreditCardComponent', () => {
  let component: CreditCardComponent;
  let fixture: ComponentFixture<CreditCardComponent>;
  beforeEach(async () => {
      await TestBed.configureTestingModule({
      declarations: [ CreditCardComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({},{
          runtimeChecks: {
            strictStateImmutability: false,
            strictActionImmutability: false,
          },
        }),
        StoreModule.forFeature('cards', reducer),
        RouterTestingModule.withRoutes([{path: ':id', component: CardFormComponent}]),
        HttpClientTestingModule,
        MatMenuModule
      ],
      providers: [MatSnackBar, Overlay],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(inject([ActivatedRoute],route => {
      fixture = TestBed.createComponent(CreditCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method onClickRemoveCard', inject([ActivatedRoute], () => {
      spyOn(component.store, 'dispatch');
      component.onClickRemoveCard('1');
      expect(component.store.dispatch).toHaveBeenCalled();
  }));

  it('should call method onCardDetailNavigate', inject([ActivatedRoute], () => {
      spyOn(component.router, 'navigate');
      component.onCardDetailNavigate(CardMock);
      expect(component.router.navigate).toHaveBeenCalled();
  }));
});

const CardMock = {
  _id: "test",
  firstName:"test",
  lastName:"test",
  cardNumber:"test",
  expiryDate: "test",
  cVV:"test"
}
