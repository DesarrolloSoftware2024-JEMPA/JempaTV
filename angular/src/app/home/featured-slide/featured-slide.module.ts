import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedSlideComponent } from './featured-slide.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    FeaturedSlideComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FeaturedSlideComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Necesario para usar elementos personalizados
})
export class FeaturedSlideModule { }