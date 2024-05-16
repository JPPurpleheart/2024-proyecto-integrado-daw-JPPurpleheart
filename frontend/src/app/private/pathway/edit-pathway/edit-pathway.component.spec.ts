import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPathwayComponent } from './edit-pathway.component';

describe('EditPathwayComponent', () => {
  let component: EditPathwayComponent;
  let fixture: ComponentFixture<EditPathwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPathwayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
