import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAsientoComponent } from './grid-asiento.component';

describe('GridAsientoComponent', () => {
  let component: GridAsientoComponent;
  let fixture: ComponentFixture<GridAsientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridAsientoComponent]
    });
    fixture = TestBed.createComponent(GridAsientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
