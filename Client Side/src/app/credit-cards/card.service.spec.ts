import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardService } from './card.service';
import { reducer } from './store/card.reducer';

describe('CardService', () => {
  let service: CardService;
  let store;
  beforeEach(() => {
    const testbed = TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({},{
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }), StoreModule.forFeature('cards', reducer), HttpClientTestingModule]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardService);
    store = TestBed.inject(Store);
    return testbed;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call method findAll', () => {
      spyOn(service.http,'get');
      service.findAll();
      expect(service.http.get).toHaveBeenCalled();
  });

  it('should call method findById', () => {
      spyOn(service.http,'get');
      service.findById("1");
      expect(service.http.get).toHaveBeenCalled();
  });

  it('should call method create', () => {
      spyOn(service.http,'post');
      service.create(CardMock);
      expect(service.http.post).toHaveBeenCalled();
  });

  it('should call method update', () => {
      spyOn(service.http,'patch');
      service.update(CardMock);
      expect(service.http.patch).toHaveBeenCalled();
  });

  it('should call method partialUpdate', () => {
      spyOn(service.http,'patch');
      service.partialUpdate("1", CardMock);
      expect(service.http.patch).toHaveBeenCalled();
  });

  it('should call method delete', () => {
      spyOn(service.http,'delete');
      service.delete("1");
      expect(service.http.delete).toHaveBeenCalled();
  });
});

const CardMock = {
    _id: "test",
    firstName:"test",
    lastName:"test",
    cardNumber:"test",
    expiryDate: "test",
    cVV:"test"
  }
