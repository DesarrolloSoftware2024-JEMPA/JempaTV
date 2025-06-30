import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { Component } from '@angular/core';
import { AccountModule } from '@abp/ng.account';
import { LocalizationModule, LocalizationService } from '@abp/ng.core';
import { UserService } from '@proxy/users';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NotificationService } from '@proxy/notifications';



@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ThemeSharedModule, AccountModule, LocalizationModule, ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent implements OnInit{


  miFormulario = new FormGroup({
    profilePictureUrl: new FormControl(""),
    acceptEmails: new FormControl(false), // Nuevo atributo de usuario.
  });

  sendTestNotification: string;
  receiveEmails: string;
  defaultProfilePicture: string = "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png";



  constructor(private userService: UserService, private notificationService: NotificationService, private localizationService: LocalizationService){
    this.sendTestNotification = localizationService.instant('JempaTV::SendTestNotification')
    this.receiveEmails = localizationService.instant('JempaTV::ReceiveEmails')
  }

  ngOnInit(): void {
    const imgBase64 = localStorage.getItem('profilePicture')
    if (imgBase64){
      this.miFormulario.patchValue({profilePictureUrl: imgBase64})
    } else {
    this.userService.getProfilePicture().subscribe(x => {this.miFormulario.patchValue({profilePictureUrl: x})})
    }
    this.userService.getEmailConfig().subscribe(x => {if (x.valueOf()==="True"){this.miFormulario.patchValue({acceptEmails: true})}
     else {this.miFormulario.patchValue({acceptEmails: false})}})
  }

  onSubmit(formData: any) {
    
    this.userService.setEmailConfig(formData.acceptEmails)
    .subscribe(()=>{
      if (formData.profilePictureFile != undefined){
        formData.profilePictureUrl =  localStorage.getItem('profilePicture');
      } else {
        if (formData.profilePictureUrl!=="" && formData.profilePictureUrl !== null){
      this.userService.setProfilePicture(formData.profilePictureUrl).subscribe()
      localStorage.removeItem('profilePicture');
      }
      }
    alert(this.localizationService.instant('AbpSettingManagement::SavedSuccessfully'));
    })
  }

  sendTestEmail(){
    this.notificationService.sendTestNotification().subscribe()
  }

adjuntarArchivo(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = () => {
        // cacheado (clave: profilePicture)
        localStorage.setItem('profilePicture', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}

}
