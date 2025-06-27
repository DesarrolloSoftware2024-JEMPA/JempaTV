import { Component } from '@angular/core';
import { CalificationDto } from '@proxy/series';
import { SerieService } from '@proxy/series';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { SerieDto } from '@proxy/series';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from '@abp/ng.core';

@Component({
  selector: 'app-qualify-serie',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './qualify-serie.component.html',
  styleUrl: './qualify-serie.component.scss'
})
export class QualifySerieComponent implements OnInit{
 
  calification = new CalificationDto();
  idSerie = Number(this.route.snapshot.paramMap.get('id'));
  serie: SerieDto;
  
  formulario = new FormGroup({
  comentario: new FormControl('', [Validators.minLength(10)])
  });

  stars = [1, 2, 3, 4, 5];

  hovered = 0;

  rating = 0;

  whatYouThink: string;
  yourRate: string;
  yourComment: string;
  qualify: string;
  plot: string;
  actors: string;
  
  onSubmit() {
    if (this.formulario.valid) {
      const calificationData = new CalificationDto
      calificationData.comentario = this.formulario.value.comentario
      calificationData.valor = this.rating;
      calificationData.idSerie = Number(this.route.snapshot.paramMap.get('id'));

      // Envía los datos a la base de datos usando el servicio
      this.serieService.addCalification(calificationData).subscribe({
        next: () => {
          this.router.navigate(['/watchlist'])
        },
        error: (error) => {
          console.error('Error al enviar los datos', error);
          alert('Hubo un error al guardar los datos');
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  addCalificationToSerie(calification: CalificationDto){
    this.serieService.addCalification(calification).subscribe();
  }

  constructor(private route: ActivatedRoute, private serieService:SerieService, private router: Router, private localizationService: LocalizationService){
    this.whatYouThink = localizationService.instant('JempaTV::WhatYouThink')
    this.actors = localizationService.instant('JempaTV::Actors')
    this.yourComment = localizationService.instant('JempaTV::YourComment')
    this.yourRate = localizationService.instant('JempaTV::YourRate')
    this.qualify = localizationService.instant('JempaTV::Qualify')
    this.plot = localizationService.instant('JempaTV::Plot')
  }

  ngOnInit(): void {
    this.getSerie(this.idSerie);
  }

  getCalificationFromSerie(idSerie: number){
    this.serieService.getCalificationFromSerie(idSerie).subscribe(x=>
    {
      this.calification = x;
      this.setRating(this.calification.valor);
    }
    )
  }

  getSerie(idSerie: number){
    this.serieService.get(idSerie).subscribe(s => {this.serie = s; console.log(s)})
  }

  setRating(value: number) {
    this.rating = value;
  }

  enter(value: number) {
    this.hovered = value;
  }

  leave() {
    this.hovered = 0;
  }


}
