import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessComponent } from './access.component';

describe('AccessComponent', () => {
  let component: AccessComponent;
  let fixture: ComponentFixture<AccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccessComponent]
    });
    fixture = TestBed.createComponent(AccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
