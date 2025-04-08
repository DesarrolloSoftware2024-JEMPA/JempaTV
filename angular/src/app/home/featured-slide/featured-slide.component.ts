// En tu componente series-carrousel.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { SerieService } from '@proxy/series'; 
import { forkJoin, Observable} from 'rxjs';
import { register } from 'swiper/element/bundle';
import { SerieDto } from '@proxy/series'; // Asegúrate de que la ruta sea correcta
import { WatchlistService } from '@proxy/watchlists'; // Asegúrate de que la ruta sea correcta

// Registrar los módulos de Swiper que necesitas
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

@Component({
  selector: 'app-featured-slide',
  templateUrl: './featured-slide.component.html',
  styleUrls: ['./featured-slide.component.scss']
  
})
export class FeaturedSlideComponent implements OnInit {
  
  public imdbIds = ["tt16366836","tt13186482","tt27714946","tt29623480","tt32560777","tt4772188", "tt0096697", "tt4154796", "tt3566834", "tt13622970"];
 public series = [] as SerieDto[];
 seriesFromWatchlist = [] as string[];

  
  constructor(private serieService: SerieService,private watchlistService: WatchlistService) {
    register();
  }

  ngOnInit(): void { 
    this.getSeriesList()
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