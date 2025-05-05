import { Component } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import {
  AuthService,
  ConfigStateService,
  CurrentUserDto,
  LanguageInfo,
  NAVIGATE_TO_MANAGE_PROFILE,
  SessionStateService,
} from '@abp/ng.core';
import { Observable } from 'rxjs';

@Component({
  selector: "app-logo",
  imports:[SharedModule],
  standalone: true,
  template: `
    <a class="navbar-brand" routerLink="/" *ngIf="(currentUser$ | async)?.isAuthenticated">
      <img
        src="./assets/images/logo/logo-light.png"
        alt="Jempa TV Logo"
        width="150"
        height="auto"
      />
    </a>
  `,
})
export class LogoComponent {

  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');

  constructor(private configState: ConfigStateService){

    }

}
