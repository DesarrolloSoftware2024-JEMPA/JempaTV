// series-carousel.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecomendedSeriesComponent } from './recomended-series.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecomendedSeriesComponent,
  ],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [
    RecomendedSeriesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Necesario para usar elementos personalizados
})
export class RecomendedSeriesModule { }