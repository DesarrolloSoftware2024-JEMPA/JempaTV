import { Component, OnInit } from '@angular/core';
import { UserService } from '@proxy/users';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-api-managements',
  standalone: true,
  templateUrl: './api-managements.component.html',
  styleUrls: ['./api-managements.component.scss'],
  imports: [SharedModule]
})
export class ApiManagementsComponent implements OnInit {
  
public error:number;    

  constructor(private userService: UserService,) {
    
  }

  ngOnInit(): void {
    this.getUserError();
    
  }


  getUserError() { 
    this.userService.getErrorQuantity().subscribe(res => {
    console.log(res);
    if (typeof res === 'number') {
      this.error = res;}
    
    });
}
}