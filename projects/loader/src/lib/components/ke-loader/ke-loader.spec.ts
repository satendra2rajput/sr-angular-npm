import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeLoader } from './ke-loader';

describe('KeLoader', () => {
  let component: KeLoader;
  let fixture: ComponentFixture<KeLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(KeLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
