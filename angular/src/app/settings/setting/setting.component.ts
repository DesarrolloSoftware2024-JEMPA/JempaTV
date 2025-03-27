import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { Component } from '@angular/core';
import { AccountModule } from '@abp/ng.account';
import { LocalizationModule } from '@abp/ng.core';
import { UserService } from '@proxy/users';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ThemeSharedModule, AccountModule, LocalizationModule, ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent implements OnInit{

  profilePicture: string = "";
  emailConfig:boolean = false;

  miFormulario = new FormGroup({
    profilePictureUrl: new FormControl(""),
    acceptEmails: new FormControl(false), // Nuevo atributo de usuario.
  });

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    this.userService.getProfilePicture().subscribe(x => {this.miFormulario.patchValue({profilePictureUrl: x})});
    this.userService.getEmailConfig().subscribe(x => {if (x.valueOf()==="True"){this.miFormulario.patchValue({acceptEmails: true})}
     else {this.miFormulario.patchValue({acceptEmails: false})}})
  }

  onSubmit(formData: any) {

    console.log(formData.profilePictureUrl, formData.acceptEmails)
    this.userService.setEmailConfig(formData.acceptEmails)
    .subscribe(()=>{if (formData.profilePictureUrl!==""){
      this.userService.setProfilePicture(formData.profilePictureUrl).subscribe()
      }})

    

  }

}
