import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetingCreateComponent } from './budgeting-create.component';

describe('BudgetingCreateComponent', () => {
  let component: BudgetingCreateComponent;
  let fixture: ComponentFixture<BudgetingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
