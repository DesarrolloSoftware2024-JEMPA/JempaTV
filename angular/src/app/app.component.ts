import { Component } from '@angular/core';
import { ReplaceableComponentsService } from '@abp/ng.core';
import { eThemeBasicComponents } from '@abp/ng.theme.basic';
import { LogoComponent } from './logo/logo.component';
import { RoutesComponent } from './routes/routes.component';
import { NavItemsComponent } from './nav-items/nav-items.component';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
   <abp-dynamic-layout></abp-dynamic-layout>
   <app-footer></app-footer>
   
  `,
})
export class AppComponent {
  constructor(private replaceableComponents: ReplaceableComponentsService) { 
    this.replaceableComponents.add({
        component: LogoComponent,
        key: eThemeBasicComponents.Logo,
      });
      this.replaceableComponents.add({
        component: RoutesComponent,
        key: eThemeBasicComponents.Routes,
      });
      this.replaceableComponents.add({
        component: NavItemsComponent,
        key: eThemeBasicComponents.NavItems,
      });
      
    }
}
