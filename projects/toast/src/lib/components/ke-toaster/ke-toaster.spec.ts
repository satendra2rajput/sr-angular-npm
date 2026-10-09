import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeToaster } from './ke-toaster';

describe('KeToaster', () => {
  let component: KeToaster;
  let fixture: ComponentFixture<KeToaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeToaster],
    }).compileComponents();

    fixture = TestBed.createComponent(KeToaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
