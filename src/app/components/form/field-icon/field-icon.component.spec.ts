import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldIconComponent } from './field-icon.component';

describe('FieldIconComponent', () => {
  let component: FieldIconComponent;
  let fixture: ComponentFixture<FieldIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
