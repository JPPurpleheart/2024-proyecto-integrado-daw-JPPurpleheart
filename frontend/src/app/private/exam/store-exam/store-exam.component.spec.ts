import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreExamComponent } from './store-exam.component';

describe('StoreExamComponent', () => {
  let component: StoreExamComponent;
  let fixture: ComponentFixture<StoreExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
