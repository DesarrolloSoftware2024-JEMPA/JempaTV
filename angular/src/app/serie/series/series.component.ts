import { Component } from '@angular/core';
import { SerieDto, SerieService } from '@proxy/series';
import { WatchlistService } from '@proxy/watchlists';
import { LocalizationService } from '@abp/ng.core';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent {

  series = [] as SerieDto[];
  seriesFromWatchlist = [] as string[];
  serieTitle: string = "";
  placeholder: string = "";
  addToWatchlist: string = "";
  addedToWatchlist:string = "";

  constructor(private serieService: SerieService, private watchlistService: WatchlistService, private localizationService: LocalizationService) {
    this.placeholder = this.localizationService.instant('JempaTV::SearchSerie')
    this.addToWatchlist = this.localizationService.instant('JempaTV::AddToWatchlist')
    this.addedToWatchlist = this.localizationService.instant('JempaTV::AddedToWatchlist')
  }


  public searchSeries() {
    if(this.serieTitle.trim()) {
      this.serieService.search(this.serieTitle.trim()).subscribe(response => this.series = response || []);
    }
  }

  public async addSerieToWachlist(imdbID:string, title:string){

    this.serieService.persistSeries(title).subscribe(() =>
      {
        this.serieService.findSerieImdbId(imdbID).subscribe((x) => {
          this.seriesFromWatchlist.push(x.imdbID);
          this.watchlistService.addSerie(x.id).subscribe();
        })
      });
    
  }

  getSeriesFromWatchlist(){
    this.watchlistService.getSeries().subscribe(series => {
      series.forEach(serie => {
        this.seriesFromWatchlist.push(serie.imdbID)
      });
    })
  }

  existsInWatchlist(imdbID: string){
    if (this.seriesFromWatchlist.includes(imdbID)) return true; 
    else return false;
  }

}
