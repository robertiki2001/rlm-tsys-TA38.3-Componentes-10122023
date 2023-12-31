import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioArticuloComponent } from './formulario-articulo.component';

describe('FormularioArticuloComponent', () => {
  let component: FormularioArticuloComponent;
  let fixture: ComponentFixture<FormularioArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioArticuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
