import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionBlockComponent } from './description-block.component';

describe('DescriptionBlockComponent', () => {
  let component: DescriptionBlockComponent;
  let fixture: ComponentFixture<DescriptionBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
