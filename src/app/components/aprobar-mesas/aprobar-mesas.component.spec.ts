import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarMesasComponent } from './aprobar-mesas.component';

describe('AprobarMesasComponent', () => {
  let component: AprobarMesasComponent;
  let fixture: ComponentFixture<AprobarMesasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarMesasComponent]
    });
    fixture = TestBed.createComponent(AprobarMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
