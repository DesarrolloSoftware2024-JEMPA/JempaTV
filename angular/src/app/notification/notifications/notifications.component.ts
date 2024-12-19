import { Component } from '@angular/core';
import { PagedResultDto } from '@abp/ng.core';
import { NotificationService, NotificationDto } from '@proxy/notifications';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

  public notifications: PagedResultDto<NotificationDto>; 

  constructor(private notificationService: NotificationService) {
    
  }

  getNotificationsFromUser(){
    this.notificationService
    .getNotifications()
    .subscribe(notifications => this.notifications = notifications)
  }

  getRowClass = (row) => { 
    return {
        'row-color1': row.read == false,
        'row-color2': row.read == true,
    };
  }

  toggleRead(notification: any): void {
    notification.read = !notification.read;
    // agregar lógica para enviar los cambios al backend usando el servicio.
  }

}
