import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateSerieDto {
  title?: string;
  year?: string;
  poster?: string;
  imdbID?: string;
}

export class CalificationDto {
  idSerie: number;
  valor: number;
  comentario?: string;
}

export interface SerieDto extends EntityDto<number> {
  title?: string;
  year?: string;
  poster?: string;
  imdbID?: string;
  plot?:string;
  actors?:string;
  calification?:CalificationDto;
}
