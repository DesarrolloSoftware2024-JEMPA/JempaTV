import { AuthService } from '@abp/ng.core';
import { Component, OnInit} from '@angular/core';
import { ConfigStateService  } from '@abp/ng.core';
import { SerieDto, SerieService } from '@proxy/series';
import { register } from "swiper/element/bundle";
import { LocalizationService } from '@abp/ng.core';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  public imdbIds = ["tt5753856","tt5607976","tt11912196","tt19231492","tt4159076","tt0204993"];
  public series = [] as SerieDto[];

  appName: string;
  appDescription: string;
  appLogin: string;

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(
    private authService: AuthService,
    private config: ConfigStateService,
    private serieService: SerieService,
    private localizationService: LocalizationService
  ) {
    this.appName = localizationService.instant('JempaTV::AppName')
    this.appDescription = localizationService.instant('JempaTV::AppDescription')
    this.appLogin = localizationService.instant('JempaTV::AppLogin')
  }

  ngOnInit() {
    this.getSeriesList(this.imdbIds)
  }

 
  login() {
    this.authService.navigateToLogin();
  }

  register(){
    this.authService
  }

  getCurrentUserName() {
    const currentUserName = this.config.getOne('currentUser').userName;
    return currentUserName;
  }

  getCurrentUserId() {
    const currentUserId = this.config.getOne('currentUser').id;
    console.log(currentUserId);
    return currentUserId;
  }

  getSerieImdbId(imdbId: string) {
    var serieDto: SerieDto;
    this.serieService.searchImdbId(imdbId).subscribe(res => {
      serieDto = res;
      this.series.push(serieDto);
    });
}

getSeriesList(imdbId:string[]){
  imdbId.forEach(id => {
    this.getSerieImdbId(id)})
}}