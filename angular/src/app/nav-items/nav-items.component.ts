import { Component,Inject } from '@angular/core';
import {
  AuthService,
  ConfigStateService,
  CurrentUserDto,
  LanguageInfo,
  NAVIGATE_TO_MANAGE_PROFILE,
  SessionStateService,
} from '@abp/ng.core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import snq from 'snq';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '@proxy/users';
import { UserDto } from '@proxy/users';
import { NotificationService } from '@proxy/notifications';


@Component({
  selector: 'app-nav-items',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './nav-items.component.html',
  styleUrl: './nav-items.component.scss'
})
export class NavItemsComponent {
  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');
  selectedTenant$ = this.sessionState.getTenant$();

  user: UserDto;
  userProfilePicture: unknown;
  unreadNotifications: boolean = false;
  defaultProfilePicture: string = "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png";

  languages$: Observable<LanguageInfo[]> = this.configState.getDeep$('localization.languages');

  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  get defaultLanguage$(): Observable<string> {
    return this.languages$.pipe(
      map(
        languages =>
          snq(
            () => languages.find(lang => lang.cultureName === this.selectedLangCulture).displayName
          ),
        ''
      )
    );
  }


// Aca filtramos para tener solo ingles y español
get dropdownLanguages$(): Observable<LanguageInfo[]> {
  return this.languages$.pipe(
    map(languages =>
      snq(
        () =>
          languages
            .filter(lang =>
              (lang.displayName === 'English' || lang.displayName === 'Español') &&
              lang.cultureName !== this.selectedLangCulture
            ),
        []
      )
    )
  );
}

  get selectedLangCulture(): string {
    return this.sessionState.getLanguage();
  }

  constructor(
    @Inject(NAVIGATE_TO_MANAGE_PROFILE) public navigateToManageProfile,
    private configState: ConfigStateService,
    private authService: AuthService,
    private sessionState: SessionStateService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {}

  onChangeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
  }

  navigateToLogin() {
    this.authService.navigateToLogin();
  }

  logout() {
    this.authService.logout().subscribe();
  }

  public getProfilePicture(){
    this.userService.getProfilePicture().subscribe(response => this.userProfilePicture = response)
    
  }

  public hasUnreadNotifications(){
    this.notificationService.unreadNotifications().subscribe(res => {this.unreadNotifications = res;});
  }

  public Init(){
    this.getProfilePicture();
    this.hasUnreadNotifications();
  }
}
