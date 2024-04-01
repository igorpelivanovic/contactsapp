import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibFormFieldIconComponent } from './field-icon.component';

describe('FieldIconComponent', () => {
  let component: LibFormFieldIconComponent;
  let fixture: ComponentFixture<LibFormFieldIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibFormFieldIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibFormFieldIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
