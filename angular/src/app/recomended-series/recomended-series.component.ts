import { Component } from '@angular/core';
import SwiperCore from 'swiper';
import { register } from 'swiper/element/bundle';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { OnInit } from '@angular/core';
import { SerieService, SerieDto } from '@proxy/series';

SwiperCore.use([EffectCoverflow, Navigation, Pagination]);

@Component({
  selector: 'app-recomended-series',
  templateUrl: './recomended-series.component.html',
  styleUrl: './recomended-series.component.scss'
})
export class RecomendedSeriesComponent implements OnInit {

  public imdbIds = ["tt5753856", "tt5607976", "tt11912196", "tt19231492", "tt4159076", "tt0204993", "tt32551602", "tt4772188", "tt5433114"];

  public series = [] as SerieDto[];

  public slidesPerView = 4;

  constructor(private serieService: SerieService) {

    register();

  }

  ngOnInit(): void {
    this.getSeriesList(this.imdbIds)
    this.onResize()
  }
  
  onResize() {
    const w = window.innerWidth;
    if (w>=992){
      this.slidesPerView = 4
    } else {
      this.slidesPerView = null;
    }
    
  }
  
  getSerieImdbId(imdbId: string) {
    var serieDto: SerieDto;
    this.serieService.searchImdbId(imdbId).subscribe(res => {
      serieDto = res;
      this.series.push(serieDto);
    });
  }

  getSeriesList(imdbId: string[]) {
    imdbId.forEach(id => {
      this.getSerieImdbId(id)
    })
  }
}
