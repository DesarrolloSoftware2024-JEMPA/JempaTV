// home.module.ts
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SeriesCarouselModule } from './series-carousel/series-carousel.module';
import { SharedModule } from '../shared/shared.module'; 
import { PageModule } from '@abp/ng.components/page';
import { HomeRoutingModule } from './home-routing.module';
import { FeaturedSlideModule } from './featured-slide/featured-slide.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [ SharedModule, HomeRoutingModule, PageModule, CommonModule,
    SeriesCarouselModule, FeaturedSlideModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Necesario para usar elementos personalizados
})
export class HomeModule { }