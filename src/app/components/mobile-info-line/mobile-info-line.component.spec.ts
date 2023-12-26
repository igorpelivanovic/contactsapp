import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInfoLineComponent } from './mobile-info-line.component';

describe('MobileInfoLineComponent', () => {
  let component: MobileInfoLineComponent;
  let fixture: ComponentFixture<MobileInfoLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileInfoLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileInfoLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
