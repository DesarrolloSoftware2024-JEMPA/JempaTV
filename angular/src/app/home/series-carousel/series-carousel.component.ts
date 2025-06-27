// series-carousel.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import SwiperCore from 'swiper';
import { register } from 'swiper/element/bundle';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { SerieDto, SerieService } from '@proxy/series';
import { forkJoin, Observable} from 'rxjs';
import { LocalizationService } from '@abp/ng.core';

// Registrar los módulos de Swiper que necesitamos
SwiperCore.use([EffectCoverflow, Navigation, Pagination]);

@Component({
  selector: 'app-series-carousel',
  templateUrl: './series-carousel.component.html',
  styleUrls: ['./series-carousel.component.scss']
})
export class SeriesCarouselComponent implements OnInit {

  public imdbIds = ["tt16366836","tt13186482","tt27714946","tt29623480","tt32560777","tt4772188", "tt0096697", "tt4154796", "tt3566834", "tt13622970"];

  public series = [] as SerieDto[];

  public slidesPerView = 3;

  today: string;

  constructor(private serieService: SerieService, private localizationService: LocalizationService) {
    register();
    this.today = localizationService.instant('JempaTV::Today')
  }

  ngOnInit(): void { 
    this.getSeriesList()
    this.onResize()
  }

  @HostListener('window:resize')

  onResize() {
    const w = window.innerWidth;
    if (w>=992){
      this.slidesPerView = 3
    } else {
      this.slidesPerView = null;
    }
    
  }
  
  getSerieImdbId(imdbId: string): Observable<SerieDto> {
    return this.serieService.searchImdbId(imdbId);
  }


getSeriesList() {
  const requests = this.imdbIds.map(id => this.getSerieImdbId(id));

  forkJoin(requests).subscribe(results => {
    this.series = results;
  });
}


}
  
