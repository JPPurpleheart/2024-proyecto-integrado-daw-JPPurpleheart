import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCourseComponent } from './store-course.component';

describe('StoreCourseComponent', () => {
  let component: StoreCourseComponent;
  let fixture: ComponentFixture<StoreCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
