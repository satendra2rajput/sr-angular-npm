import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeToast } from './ke-toast';

describe('KeToast', () => {
  let component: KeToast;
  let fixture: ComponentFixture<KeToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeToast],
    }).compileComponents();

    fixture = TestBed.createComponent(KeToast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
