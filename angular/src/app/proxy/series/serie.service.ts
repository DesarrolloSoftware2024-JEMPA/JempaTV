import type { CalificationDto, CreateUpdateSerieDto, SerieDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SerieService {
  apiName = 'Default';
  

create = (input: CreateUpdateSerieDto, config?: Partial<Rest.Config>) =>
  this.restService.request<any, SerieDto>({
    method: 'POST',
    url: '/api/app/serie',
    body: input,
  },
  { apiName: this.apiName,...config });


delete = (id: number, config?: Partial<Rest.Config>) =>
  this.restService.request<any, void>({
    method: 'DELETE',
    url: `/api/app/serie/${id}`,
  },
  { apiName: this.apiName,...config });


get = (id: number, config?: Partial<Rest.Config>) =>
  this.restService.request<any, SerieDto>({
    method: 'GET',
    url: `/api/app/serie/${id}`,
  },
  { apiName: this.apiName,...config });


getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
  this.restService.request<any, PagedResultDto<SerieDto>>({
    method: 'GET',
    url: '/api/app/serie',
    params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
  },
  { apiName: this.apiName,...config });
  

search = (title: string, config?: Partial<Rest.Config>) =>
  this.restService.request<any, SerieDto[]>({
    method: 'POST',
    url: '/api/app/serie/search',
    params: { title },
  },
  { apiName: this.apiName,...config });

searchImdbId = (imdbId: string, config?: Partial<Rest.Config>) =>
  this.restService.request<any, SerieDto>({
    method: 'POST',
    url: `/api/app/serie/search-imdb-id/${imdbId}`,
  },
  { apiName: this.apiName,...config });

findSerieImdbId = (imdbId: string, config?: Partial<Rest.Config>) =>
  this.restService.request<any, SerieDto>({
    method: 'POST',
    url: `/api/app/serie/find-serie-imdb-id/${imdbId}`,
    params: {imdbId}
  },
  { apiName: this.apiName,...config });


update = (id: number, input: CreateUpdateSerieDto, config?: Partial<Rest.Config>) =>
  this.restService.request<any, SerieDto>({
    method: 'PUT',
    url: `/api/app/serie/${id}`,
    body: input,
  },
  { apiName: this.apiName,...config });

getCalifications = (config?: Partial<Rest.Config>) =>
  this.restService.request<any, CalificationDto[]>({
    method: 'GET',
    url: `/api/app/serie/califications`,
  },
  { apiName: this.apiName,...config });

addCalification = (calification:CalificationDto, config?: Partial<Rest.Config>) =>
  this.restService.request<any, CalificationDto[]>({
    method: 'POST',
    url: `/api/app/serie/calification`,
    body: calification,
  },
  { apiName: this.apiName,...config });

persistSeries = (title:string,config?: Partial<Rest.Config>) => 
  this.restService.request<any, void>({
    method: 'POST',
    url: `/api/app/serie/persist-series`,
    params: {title},
  },
  { apiName: this.apiName,...config });

getCalificationFromSerie = (serieId:number,config?: Partial<Rest.Config>) => 
  this.restService.request<any, CalificationDto>({
    method: 'GET',
    url: `/api/app/serie/calification-from-serie/${serieId}`,
    params: [serieId]
    
  },
  { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
