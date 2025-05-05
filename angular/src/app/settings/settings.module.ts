import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { AccountModule } from '@abp/ng.account';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ThemeSharedModule,
    AccountModule
  ]
  
})
export class SettingsModule { }
