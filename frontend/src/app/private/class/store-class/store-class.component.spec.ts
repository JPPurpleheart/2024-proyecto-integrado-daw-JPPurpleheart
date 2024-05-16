import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreClassComponent } from './store-class.component';

describe('StoreClassComponent', () => {
  let component: StoreClassComponent;
  let fixture: ComponentFixture<StoreClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
