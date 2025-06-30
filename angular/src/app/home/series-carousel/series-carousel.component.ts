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

  public imdbIds = [
    "tt3581920",
    "tt31510819",
    "tt31216548",
    "tt9253284",
    "tt0944947",
    "tt31710249",
    "tt13406094",
    "tt13064902",
    "tt0903747",
    "tt14452776"
  ]
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
  
