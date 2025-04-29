import { Component } from '@angular/core';
import { AuthService } from '@abp/ng.core';
import { SharedModule } from '../shared/shared.module';



@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(
    private authService: AuthService,
  ) {}
  
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
}
