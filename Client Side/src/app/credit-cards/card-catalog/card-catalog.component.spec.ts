import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { CardFormComponent } from '../card-form/card-form.component';
import { CardCatalogComponent } from './card-catalog.component';
import { reducer } from '../store/card.reducer';
import { ActivatedRoute } from '@angular/router';


describe('CardCatalogComponent', () => {
  let component: CardCatalogComponent;
  let fixture: ComponentFixture<CardCatalogComponent>;
  beforeEach(async () => {
      await TestBed.configureTestingModule({
      declarations: [ CardCatalogComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({},{
          runtimeChecks: {
            strictStateImmutability: false,
            strictActionImmutability: false,
          },
        }),
        StoreModule.forFeature('cards', reducer),
        RouterTestingModule.withRoutes([{path: 'create', component: CardFormComponent}]),
        HttpClientTestingModule
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(inject([ActivatedRoute],route => {
    fixture = TestBed.createComponent(CardCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method onNavigateToCreateCardView', inject([ActivatedRoute], () => {
      spyOn(component.router, 'navigate');
      component.onNavigateToCreateCardView();
      expect(component.router.navigate).toHaveBeenCalled();
  }));
});
