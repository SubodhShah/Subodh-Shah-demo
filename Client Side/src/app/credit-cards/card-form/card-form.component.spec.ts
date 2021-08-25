import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { CardFormComponent } from '../card-form/card-form.component';
import { reducer } from '../store/card.reducer';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';


describe('CardFormComponent', () => {
  let component: CardFormComponent;
  let fixture: ComponentFixture<CardFormComponent>;
  beforeEach(async () => {
      await TestBed.configureTestingModule({
      declarations: [ CardFormComponent ],
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
      providers: [MatSnackBar, Overlay, {
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                params:{id:'1'}
            }
        },
      }],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(inject([ActivatedRoute],route => {
      fixture = TestBed.createComponent(CardFormComponent);
      component = fixture.componentInstance;
      component.activatedRoute.snapshot.params.id = '1';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    component.activatedRoute.snapshot.params.id = '1';
    component.ngOnInit();
  });

  it('should call method onNavigateToCatalog', inject([ActivatedRoute], () => {
      spyOn(component.router, 'navigate');
      component.onNavigateToCatalog();
      expect(component.router.navigate).toHaveBeenCalled();
  }));
  
  it('should call method onFormSubmit when isEditFlowActive is true', () => {
      spyOn(component.store, 'dispatch');
      component.isEditFlowActive = true;
      component.onFormSubmit();
      expect(component.store.dispatch).toHaveBeenCalled();
  });
  
  it('should call method onFormSubmit when isEditFlowActive is false', () => {
      spyOn(component.store, 'dispatch');
      component.isEditFlowActive = false;
      component.onFormSubmit();
      expect(component.store.dispatch).toHaveBeenCalled();
  });
});
