import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendedSeriesComponent } from './recomended-series.component';

describe('RecomendedSeriesComponent', () => {
  let component: RecomendedSeriesComponent;
  let fixture: ComponentFixture<RecomendedSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendedSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendedSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
