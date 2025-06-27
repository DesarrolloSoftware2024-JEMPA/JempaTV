import { RestService, PagedResultDto, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type {NotificationDto} from './models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  apiName = 'Default';


  getNotifications = (config?: Partial<Rest.Config>) => 
    this.restService.request<any, PagedResultDto<NotificationDto>>({
        method: 'GET',
        url: '/api/app/notification/notification-from-user'
    }, {apiName: this.apiName,...config})

  unreadNotifications = (config?: Partial<Rest.Config>) =>
    this.restService.request<any,boolean>({
      method: 'GET',
      url: '/api/app/notification/unread-notifications'
    }, {apiName: this.apiName,...config})
  
  sendTestNotification = (config?: Partial<Rest.Config>) =>
    this.restService.request<any,any>({
      method: 'POST',
      url: '/api/app/notification/test-notification'
    }, {apiName: this.apiName,...config})

  updateNotification = (notification: NotificationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<NotificationDto,any>({
      method: 'PUT',
      url: '/api/app/notification',
      body: notification
    }, {apiName: this.apiName,...config})
      

  constructor(private restService: RestService) {}

}