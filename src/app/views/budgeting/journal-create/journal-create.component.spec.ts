import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalCreateComponent } from './journal-create.component';

describe('JournalCreateComponent', () => {
  let component: JournalCreateComponent;
  let fixture: ComponentFixture<JournalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
