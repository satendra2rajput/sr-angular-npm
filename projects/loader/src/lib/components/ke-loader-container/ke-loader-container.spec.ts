import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeLoaderContainer } from './ke-loader-container';

describe('KeLoaderContainer', () => {
  let component: KeLoaderContainer;
  let fixture: ComponentFixture<KeLoaderContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeLoaderContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(KeLoaderContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
