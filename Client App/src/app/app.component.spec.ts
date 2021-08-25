import { TestBed, async } from '@angular/core/testing'; // 1
import { AppComponent } from './app.component';
 
describe('AppComponent', () => { // 2
  beforeEach(async(() => { // 3
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
 
  it('should create the app', () => { // 4
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-component-testing'`, () => {  //5
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Subodh Shah Demo');
  });
 
 
 
});