import type { UserDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { STRING_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiName = 'Default';
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserDto>({
      method: 'GET',
      url: `/api/identity/users/${id}`,
    },
    { apiName: this.apiName,...config });

  getProfilePicture = (config?: Partial<Rest.Config>) => {
    return this.restService.request({
      method: 'GET',
      url: `/api/app/user/get-profile-picture`,
    },
    { apiName: this.apiName,...config });
  }
  constructor(private restService: RestService) {}
}

