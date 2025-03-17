import { Component, OnInit } from '@angular/core';
import { UserService } from '@proxy/users';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogDto } from '@proxy/log';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-api-managements',
  standalone: true,
  templateUrl: './api-managements.component.html',
  styleUrls: ['./api-managements.component.scss'],
  imports: [SharedModule]
})
export class ApiManagementsComponent implements OnInit {
  
public error:number;
public apiStats = [] as LogDto[];
public chart: any;


public labels: string[] = [];
  public data: number[] = [];

  public lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Actividad de la API por Mes',
      },
    },
  };

  public lineChartColors = [
    {
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';


  constructor(private userService: UserService,) {
    Chart.register(...registerables);
    
  }

  ngOnInit(): void {
    this.getUserError();
    this.getApiStats();
     
  
  }
    
  

  getApiStats() { 
    this.userService.getApiStats().subscribe((res) => {
    this.apiStats=res;
    const actividadPorMes = this.contarActividadPorMes(res);
    this.crearGrafico(actividadPorMes);
  },
    (error) => {
      
      console.error('Error al obtener estadísticas de la API', error);
    }
  
  );
}

contarActividadPorMes(logs: LogDto[]): { [mes: string]: number } { //El metodo devuelve un array donde cada elemento mes tiene un valor asignado q corresponde a las llamadas a la api 
  const actividadPorMes: { [mes: string]: number } = {};

  logs.forEach(log => {
      const fecha = new Date(log.executionTime); // Asegúrate de que 'executionTime' sea el campo correcto
      const mes = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`; // Formato "YYYY-MM"

      if (!actividadPorMes[mes]) {
          actividadPorMes[mes] = 0;
      }

      actividadPorMes[mes] += 1; // 
  });

  return actividadPorMes; // Devolver el objeto con la actividad por mes
}

crearGrafico(actividadPorMes: { [mes: string]: number }) {
  const meses = Object.keys(actividadPorMes);
  const actividad = Object.values(actividadPorMes);

  this.chart = new Chart('myChart', {
    type: 'line', // Tipo de gráfico (línea)
    data: {
      labels: meses, // Etiquetas del eje X (meses)
      datasets: [
        {
          label: 'Actividad de la API', // Leyenda del gráfico
          data: actividad, // Datos de actividad por mes
          borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo
          borderWidth: 2, // Ancho de la línea
          fill: true, // Rellenar el área bajo la línea
        },
      ],
    },
    options: {
      responsive: true, // Gráfico responsivo
      plugins: {
        title: {
          display: true,
          text: 'Actividad de la API por Mes', // Título del gráfico
        },
      },
      scales: {
        y: {
          beginAtZero: true, // Eje Y comienza en 0
        },
      },
    },
  });
}



  getUserError() { 
    this.userService.getErrorQuantity().subscribe(res => {
    console.log(res);
    if (typeof res === 'number') {
      this.error = res;}
    
    });
  }}
