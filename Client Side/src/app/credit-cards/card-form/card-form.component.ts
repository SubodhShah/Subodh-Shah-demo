import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CardService } from '../card.service';
import * as cardActions from '../store/card.actions';
import * as cardSelector from '../store/card.selectors';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit, OnDestroy {
  cardForm: FormGroup;
  isEditFlowActive = false;
  private currentCardIdOnEdit: string;
  private cardStore$: Subscription;

  constructor(
    public activatedRoute: ActivatedRoute,
    private cardService: CardService,
    public router: Router,
    private snackBar: MatSnackBar,
    public store: Store
  ) {
    this.cardStore$ = new Subscription();
    this.cardForm = this.initFormBuilder();
    this.prepareCreateOrUpdateFlow();
  }

  ngOnInit(): void {
    this.cardStore$.add(
      this.store.select(cardSelector.isCreateSuccess)
        .pipe(filter(done => done))
        .subscribe(() => {
          this.resetForm();
          this.snackBar.open('Card created!', 'OK', { duration: 2000 });
        })
    );
    this.cardStore$.add(
      this.store.select(cardSelector.isUpdateSuccess)
        .pipe(filter(done => done))
        .subscribe(() => this.snackBar.open('Card updated!', 'OK', { duration: 2000 }))
    );
  }

  ngOnDestroy(): void {
    this.cardStore$?.unsubscribe();
  }

  onNavigateToCatalog(): void {
    this.router.navigate(['..']);
  }

  onFormSubmit(): void {
    if (this.isEditFlowActive) {
      const cardToUpdate = { ...this.cardForm.value, _id: this.currentCardIdOnEdit};
      this.store.dispatch(cardActions.updateCard({ card: cardToUpdate }));
    } else {
      this.store.dispatch(cardActions.createCard({ card: this.cardForm.value }));
    }
  }

  private prepareCreateOrUpdateFlow() {
    debugger;
    const idFromUrlParam: string = this.activatedRoute.snapshot.params.id;
    if (idFromUrlParam) {
      this.isEditFlowActive = true;
      this.currentCardIdOnEdit = idFromUrlParam;
      this.store.dispatch(cardActions.SelectCard({ id: idFromUrlParam }));
      this.store.dispatch(cardActions.findOneCard({ id: idFromUrlParam }));
      this.handleCardSelectedChanges(idFromUrlParam);
      // this.cardForm.get('firstName').setValue('dsa');
    } else {
    }
  }

  private initFormBuilder(): FormGroup {
    return new FormGroup({
      firstName: new FormControl({ value: '', disabled: false }, [Validators.required]),
      lastName: new FormControl({ value: '', disabled: false }, [Validators.required]),
      cardNumber: new FormControl({ value: '', disabled: false }, [Validators.required]),
      expiryDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
      cVV: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
  }

  private handleCardSelectedChanges(id: string): void {
    this.cardStore$.add(
      this.store.pipe(select(cardSelector.selectCurrentCard))
        .pipe(filter(card => !!card))
        .subscribe(cardSelected => {
          const { firstName, lastName, cardNumber, expiryDate, cVV } = cardSelected;
          this.cardForm.patchValue({ firstName, lastName, cardNumber, expiryDate,cVV });
        })
    );
  }

  private resetForm(): void {
    this.cardForm.reset();
    Object.keys(this.cardForm.controls).forEach(key => {
      this.cardForm.get(key).setErrors(null);
    });
  }

}
