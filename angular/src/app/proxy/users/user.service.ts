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
    return this.restService.request<any,string>({
      method: 'GET',
      url: `/api/app/user/get-profile-picture`,
    },
    { apiName: this.apiName,...config });
  }

  setProfilePicture = (profilePicture: string, config?: Partial<Rest.Config>) => {
    return this.restService.request<any,any>({
      method: 'POST',
      url: `/api/app/user/set-profile-picture`,
      params: {profilePicture}
    },
    { apiName: this.apiName,...config });
  }

  getEmailConfig = (config?: Partial<Rest.Config>) => {
    return this.restService.request<any,string>({
      method: 'GET',
      url: `/api/app/user/get-user-email-configuration`,
    },
    { apiName: this.apiName,...config });
  }

  setEmailConfig = (emailNotification: boolean, config?: Partial<Rest.Config>) => {
    return this.restService.request<any,any>({
      method: 'POST',
      url: `/api/app/user/set-user-email-configuration`,
      params: {emailNotification}
    },
    { apiName: this.apiName,...config });
  }
  constructor(private restService: RestService) {}
}

