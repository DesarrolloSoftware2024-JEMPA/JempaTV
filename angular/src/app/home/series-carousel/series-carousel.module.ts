// series-carousel.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesCarouselComponent } from './series-carousel.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    SeriesCarouselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SeriesCarouselComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Necesario para usar elementos personalizados
})
export class SeriesCarouselModule { }