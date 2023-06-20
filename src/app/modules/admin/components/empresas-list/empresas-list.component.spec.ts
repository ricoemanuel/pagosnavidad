import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasListComponent } from './empresas-list.component';

describe('EmpresasListComponent', () => {
  let component: EmpresasListComponent;
  let fixture: ComponentFixture<EmpresasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresasListComponent]
    });
    fixture = TestBed.createComponent(EmpresasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
