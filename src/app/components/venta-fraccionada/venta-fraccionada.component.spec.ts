import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaFraccionadaComponent } from './venta-fraccionada.component';

describe('VentaFraccionadaComponent', () => {
  let component: VentaFraccionadaComponent;
  let fixture: ComponentFixture<VentaFraccionadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaFraccionadaComponent]
    });
    fixture = TestBed.createComponent(VentaFraccionadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
