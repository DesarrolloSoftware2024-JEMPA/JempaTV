import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDetailComponentComponent } from './series-detail.component';

describe('SeriesDetailComponentComponent', () => {
  let component: SeriesDetailComponentComponent;
  let fixture: ComponentFixture<SeriesDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesDetailComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
