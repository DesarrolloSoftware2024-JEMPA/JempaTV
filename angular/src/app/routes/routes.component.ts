import { Component, HostBinding } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { Observable } from "rxjs";
import { CurrentUserDto,ConfigStateService, LocalizationService } from "@abp/ng.core";

@Component({
  selector: "app-routes",
  templateUrl: "routes.component.html",
  imports: [ SharedModule],
  standalone: true
})
export class RoutesComponent {
  @HostBinding("class.mx-auto")
  marginAuto = true;

  public isAdmin = false;
  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');

  apiStats: string;
  
  get smallScreen() {
    return window.innerWidth < 992;
  }

  constructor(private configState: ConfigStateService, private localizationService: LocalizationService){
    this.apiStats = localizationService.instant('JempaTV::ApiStats')
  }

  isAdminUser(){
    if (this.currentUser$){
      this.currentUser$.subscribe(x => {
        if(x.roles[0] == "Admin"){
          this.isAdmin = true;
        } else {this.isAdmin = false}
      })
    }
  } 


}
