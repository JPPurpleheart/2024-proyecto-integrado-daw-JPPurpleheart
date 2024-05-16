import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveExamComponent } from './solve-exam.component';

describe('SolveExamComponent', () => {
  let component: SolveExamComponent;
  let fixture: ComponentFixture<SolveExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolveExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
