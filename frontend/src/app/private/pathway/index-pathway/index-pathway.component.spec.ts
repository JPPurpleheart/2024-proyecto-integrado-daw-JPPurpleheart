import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPathwayComponent } from './index-pathway.component';

describe('IndexPathwayComponent', () => {
  let component: IndexPathwayComponent;
  let fixture: ComponentFixture<IndexPathwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPathwayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
