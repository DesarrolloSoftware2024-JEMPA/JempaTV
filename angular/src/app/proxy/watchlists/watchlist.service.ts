import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { SerieDto } from '@proxy/series';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  apiName = 'Default';
  

  addSerie = (serieId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/watch-list/serie/${serieId}`
    },
    { apiName: this.apiName,...config });


  deleteSerie = (serieId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/watch-list/serie-from-watchlist`,
      params: {serieId}
    },
    { apiName: this.apiName,...config }); 


  getSeries = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, SerieDto[]>({
      method: 'GET',
      url: `/api/app/watch-list/series`,
    },
    { apiName: this.apiName,...config }); 
  

  constructor(private restService: RestService) {}
}
