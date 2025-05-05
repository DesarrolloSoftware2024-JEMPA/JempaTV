import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifySerieComponent } from './qualify-serie.component';

describe('QualifySerieComponent', () => {
  let component: QualifySerieComponent;
  let fixture: ComponentFixture<QualifySerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualifySerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualifySerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
