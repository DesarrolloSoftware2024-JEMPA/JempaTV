import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistsComponent } from './watchlists/watchlists.component';
import { QualifySerieComponent } from './qualify-serie/qualify-serie.component';



const routes: Routes = [
  { path: '', component: WatchlistsComponent }, // Ruta por defecto
  { path: 'qualify/:id', component: QualifySerieComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchlistRoutingModule { }
