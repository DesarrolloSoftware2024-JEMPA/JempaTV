import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { RecomendedSeriesModule } from '../recomended-series/recomended-series.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    RecomendedSeriesModule
  ]
})
export class WatchlistModule { }
