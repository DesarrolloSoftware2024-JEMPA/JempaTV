import { Component } from '@angular/core';
import { LocalizationService, PagedResultDto } from '@abp/ng.core';
import { NotificationService, NotificationDto } from '@proxy/notifications';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { AdjustTimePipe } from 'src/app/shared/pipes/adjust-time.pipe';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [SharedModule, CommonModule, AdjustTimePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {

  public notifications: PagedResultDto<NotificationDto>;

  myNotifications: string;
  TestNotificationTitle: string;
  TestNotificationComment: string;


  constructor(private notificationService: NotificationService, private localizationService: LocalizationService) {
    this.myNotifications = localizationService.instant('JempaTV::MyNotifications')
    this.TestNotificationComment = localizationService.instant('JempaTV::TestNotificationComment')
    this.TestNotificationTitle = localizationService.instant('JempaTV::TestNotificationTitle')
  }

getNotificationsFromUser() {
  this.notificationService.getNotifications().subscribe( (notifications) => {
    this.notifications = notifications;
  });
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
