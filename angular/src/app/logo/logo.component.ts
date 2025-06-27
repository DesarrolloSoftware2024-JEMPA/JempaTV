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
    <a class="navbar-brand" routerLink="/" *ngIf="(currentUser$ | async)?.isAuthenticated" style="display: flex; flex-direction: row-reverse; gap: 0.5rem; margin: 1rem;">
      <img
        src="./assets/images/logo/jempatv_icon.svg"
        alt="Jempa TV Logo"
        width="30"
        height="auto"
        style="padding-bottom: 0.8rem;"
      />
      <h4>JempaTV</h4>
    </a>
  `,
})
export class LogoComponent {

  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');

  constructor(private configState: ConfigStateService){

    }

}
