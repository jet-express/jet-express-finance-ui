import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetingDetailComponent } from './budgeting-detail.component';

describe('BudgetingDetailComponent', () => {
  let component: BudgetingDetailComponent;
  let fixture: ComponentFixture<BudgetingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
