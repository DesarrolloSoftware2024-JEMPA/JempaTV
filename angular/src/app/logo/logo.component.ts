import { Component } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "app-logo",
  imports:[SharedModule],
  standalone: true,
  template: `
    <a class="navbar-brand" routerLink="/">
      <!-- Change the img src -->
      <img
        src="./assets/images/logo/logo-light.png"
        alt="logo"
        width="150"
        height="auto"
      />
    </a>
  `,
})
export class LogoComponent {}
