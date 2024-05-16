import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPathwayComponent } from './show-pathway.component';

describe('ShowPathwayComponent', () => {
  let component: ShowPathwayComponent;
  let fixture: ComponentFixture<ShowPathwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPathwayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
