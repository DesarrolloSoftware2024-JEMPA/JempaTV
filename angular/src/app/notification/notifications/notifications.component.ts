import { Component } from '@angular/core';
import { PagedResultDto } from '@abp/ng.core';
import { NotificationService, NotificationDto } from '@proxy/notifications';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {

  public notifications: PagedResultDto<NotificationDto>;

  constructor(private notificationService: NotificationService) {

  }

  getNotificationsFromUser() {
    this.notificationService
      .getNotifications()
      .subscribe(notifications => {
        this.notifications=notifications;
      }
      )
  }

  getClass = (row) => {
    return {
      'not-read': row.read == false,
      'read': row.read == true,
    };
  }

  toggleRead(notification: any): void {
    notification.read = !notification.read;
    this.notificationService.updateNotification(notification).subscribe();


  }

}
