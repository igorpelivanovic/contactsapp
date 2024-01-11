import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpLeavePageComponent } from './pop-up-leave-page.component';

describe('PopUpLeavePageComponent', () => {
  let component: PopUpLeavePageComponent;
  let fixture: ComponentFixture<PopUpLeavePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpLeavePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpLeavePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
