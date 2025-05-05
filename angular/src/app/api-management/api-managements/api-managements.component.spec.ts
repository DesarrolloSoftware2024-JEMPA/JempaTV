import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiManagementsComponent } from './api-managements.component';

describe('ApiManagementsComponent', () => {
  let component: ApiManagementsComponent;
  let fixture: ComponentFixture<ApiManagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiManagementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiManagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
