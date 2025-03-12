import { Component, OnInit } from '@angular/core';
import { CalificationDto, SerieDto, SerieService } from '@proxy/series';
import { WatchlistService } from '@proxy/watchlists';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-watchlists',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './watchlists.component.html',
  styleUrl: './watchlists.component.scss'
})
export class WatchlistsComponent implements OnInit {

  public watchlist = [] as SerieDto[];

  public califications = [] as CalificationDto[];

  constructor (private watchlistService: WatchlistService, private serieService: SerieService){

  }

  ngOnInit(){
    this.getWatchlist();
  }

  getWatchlist(){
    this.watchlistService.getSeries().subscribe(x => this.watchlist = x);
  }

  addSerieToWatchlist(serieId: number){
    this.watchlistService.addSerie(serieId).subscribe();
  }

  deleteSerieFromWatchlist(serieId:number){
    this.watchlistService.deleteSerie(serieId).subscribe();
  }

  getRowCalification(row){
    for (let calif of this.califications)
    {
      if (calif.idSerie===row.id){
        return calif
      }
    }
  }

  getRowUrl(row){
    const url = "/watchlist/qualify/"+row.id;
    return url;
  }

  getUserCalifications(){
    this.serieService.getCalifications().subscribe(x => this.califications = x);
  }

  editUserCalification(){

  }

}
