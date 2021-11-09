import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetingPrintComponent } from './budgeting-print.component';

describe('BudgetingPrintComponent', () => {
  let component: BudgetingPrintComponent;
  let fixture: ComponentFixture<BudgetingPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetingPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetingPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
