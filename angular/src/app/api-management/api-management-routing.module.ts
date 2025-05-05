import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiManagementsComponent } from './api-managements/api-managements.component';

const routes: Routes = [
  { path: '', component: ApiManagementsComponent } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiManagementRoutingModule { }
