import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeModal } from './ke-modal';

describe('KeModal', () => {
  let component: KeModal;
  let fixture: ComponentFixture<KeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeModal],
    }).compileComponents();

    fixture = TestBed.createComponent(KeModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
