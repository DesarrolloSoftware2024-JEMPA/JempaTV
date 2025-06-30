
import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { SerieService } from '@proxy/series'; 
import { forkJoin, Observable} from 'rxjs';
import { register } from 'swiper/element/bundle';
import { SerieDto } from '@proxy/series'; 
import { WatchlistService } from '@proxy/watchlists';
import { environment } from 'src/environments/environment.prod';


SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

@Component({
  selector: 'app-featured-slide',
  templateUrl: './featured-slide.component.html',
  styleUrls: ['./featured-slide.component.scss']
  
})
export class FeaturedSlideComponent implements OnInit {
  
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
  ];
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