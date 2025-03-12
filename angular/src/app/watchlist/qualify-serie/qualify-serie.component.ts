import { Component } from '@angular/core';
import { CalificationDto } from '@proxy/series';
import { SerieService } from '@proxy/series';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qualify-serie',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './qualify-serie.component.html',
  styleUrl: './qualify-serie.component.scss'
})
export class QualifySerieComponent  {
 
  calification = new CalificationDto();
  idSerie = Number(this.route.snapshot.paramMap.get('id'));
  
  formulario = new FormGroup({
  valor: new FormControl('', [Validators.required, Validators.max(5), Validators.min(1)]),
  comentario: new FormControl('', [Validators.minLength(10)])
  });
  
  onSubmit() {
    if (this.formulario.valid) {
      // Crea una instancia de CalificationDto con los valores del formulario
      const calificationData = new CalificationDto
      calificationData.comentario = this.formulario.value.comentario
      calificationData.valor = Number(this.formulario.value.valor)
      calificationData.idSerie = Number(this.route.snapshot.paramMap.get('id'));
      

      // Envía los datos a la base de datos usando el servicio
      this.serieService.addCalification(calificationData).subscribe({
        next: (response) => {
          console.log('Datos enviados correctamente', response);
          alert('Datos guardados exitosamente');
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

  constructor(private route: ActivatedRoute, private serieService:SerieService){

  }

  getCalificationFromSerie(idSerie: number){
    this.serieService.getCalificationFromSerie(idSerie).subscribe((x)=>{
      this.calification = x
    })
  }


}
