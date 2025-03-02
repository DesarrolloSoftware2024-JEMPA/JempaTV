// series-carousel.component.ts
import { Component, OnInit } from '@angular/core';
import SwiperCore from 'swiper';
import { register } from 'swiper/element/bundle';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { SerieDto, SerieService } from '@proxy/series';

// Registrar los módulos de Swiper que necesitamos
SwiperCore.use([EffectCoverflow, Navigation, Pagination]);

@Component({
  selector: 'app-series-carousel',
  templateUrl: './series-carousel.component.html',
  styleUrls: ['./series-carousel.component.scss']
})
export class SeriesCarouselComponent implements OnInit {
  // Arreglo de series (reemplaza con tu modelo de datos real)
  public imdbIds = ["tt5753856","tt5607976","tt11912196","tt19231492","tt4159076","tt0204993"];

  public series = [] as SerieDto[];

  constructor(private serieService: SerieService) {
    // Registrar elementos personalizados de Swiper
    register();
    
  }

  ngOnInit(): void { 
    this.getSeriesList(this.imdbIds)
  }
  getSerieImdbId(imdbId: string) {
    var serieDto: SerieDto;
    this.serieService.searchImdbId(imdbId).subscribe(res => {
      serieDto = res;
      this.series.push(serieDto);
    });
}

getSeriesList(imdbId:string[]){
  imdbId.forEach(id => {
    this.getSerieImdbId(id)})
}}
  
  
