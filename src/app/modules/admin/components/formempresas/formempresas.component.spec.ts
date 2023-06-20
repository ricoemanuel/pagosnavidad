import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormempresasComponent } from './formempresas.component';

describe('FormempresasComponent', () => {
  let component: FormempresasComponent;
  let fixture: ComponentFixture<FormempresasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormempresasComponent]
    });
    fixture = TestBed.createComponent(FormempresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
