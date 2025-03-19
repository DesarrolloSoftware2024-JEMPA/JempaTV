import { RestService, Rest } from '@abp/ng.core';
import { STRING_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LogDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  apiName = 'Default';

  getErrorQuantity = (config?: Partial<Rest.Config>) => {
    return this.restService.request({
      method: 'GET',
      url: `/api/app/log/get-error-quantity`,
    },
    { apiName: this.apiName,...config });
  }
  getApiStats = (config?: Partial<Rest.Config>) => {
    return this.restService.request<any, LogDto[]>({
      method: 'GET',
      url: `/api/app/log/get-api-stats`,
    },
    { apiName: this.apiName,...config });
  }
  getAverageExecutionDuration = (config?: Partial<Rest.Config>) => {
    return this.restService.request<any, number>({
      method: 'GET',
      url: `/api/app/log/get-average-execution-duration`,
    },
    { apiName: this.apiName,...config });
  }
  getTotalUsers = (config?: Partial<Rest.Config>) => {
    return this.restService.request<any, number>({
      method: 'GET',
      url: `/api/app/log/get-total-users`,
    },
    { apiName: this.apiName,...config });
  }
  
  constructor(private restService: RestService) {}
}

