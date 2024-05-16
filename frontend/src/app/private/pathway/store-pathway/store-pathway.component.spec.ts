import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePathwayComponent } from './store-pathway.component';

describe('StorePathwayComponent', () => {
  let component: StorePathwayComponent;
  let fixture: ComponentFixture<StorePathwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePathwayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
