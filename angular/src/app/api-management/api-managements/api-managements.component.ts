import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogDto } from '@proxy/logs';
import { Chart, registerables } from 'chart.js';
import { LogService } from '@proxy/logs';
import { LocalizationService } from '@abp/ng.core'; // <-- Importa LocalizationService

@Component({
  selector: 'app-api-managements',
  standalone: true,
  templateUrl: './api-managements.component.html',
  styleUrls: ['./api-managements.component.scss'],
  imports: [SharedModule]
})
export class ApiManagementsComponent implements OnInit {

  public error: number;
  public executionDuration: number;
  public totalUsers: number;
  public apiStats = [] as LogDto[];
  public chart: any;

  public load = false;

  public labels: string[] = [];
  public data: number[] = [];

  // Variables de localización
  statsLabel: string;
  apiActivityLabel: string;
  byMonthLabel: string;
  totalErrorsLabel: string;
  totalUsersLabel: string;
  responseTimeLabel: string;
  apiStatistics: string;

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
        text: '', // Se setea dinámicamente en crearGrafico
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

  constructor(
    private logService: LogService,
    private localizationService: LocalizationService // <-- Inyecta LocalizationService
  ) {
    Chart.register(...registerables);

    // Inicializa las variables de localización
    this.statsLabel = this.localizationService.instant('JempaTV::Stats');
    this.apiActivityLabel = this.localizationService.instant('JempaTV::ApiActivity');
    this.byMonthLabel = this.localizationService.instant('JempaTV::byMonth');
    this.totalErrorsLabel = this.localizationService.instant('JempaTV::totalErrors');
    this.totalUsersLabel = this.localizationService.instant('JempaTV::totalUsers');
    this.responseTimeLabel = this.localizationService.instant('JempaTV::responseTime');
    this.apiStatistics = this.localizationService.instant('JempaTV::ApiStats')
  }

  ngOnInit(): void {
    this.getUserError();
    this.getAverageExecutionDuration();
    this.getTotalUsers();
    this.getApiStats();
  }

  getApiStats() {
    this.logService.getApiStats().subscribe((res) => {
      this.apiStats = res;
      const actividadPorMes = this.contarActividadPorMes(res);
      this.crearGrafico(actividadPorMes);
      this.load = true;
    },
      (error) => {
        console.error('Error al obtener estadísticas de la API', error);
      }
    );
  }

  contarActividadPorMes(logs: LogDto[]): { [mes: string]: number } {
    const actividadPorMes: { [mes: string]: number } = {};

    logs.forEach(log => {
      const fecha = new Date(log.executionTime);
      const mes = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;
      if (!actividadPorMes[mes]) {
        actividadPorMes[mes] = 0;
      }
      actividadPorMes[mes] += 1;
    });

    return actividadPorMes;
  }

  crearGrafico(actividadPorMes: { [mes: string]: number }) {
    const meses = Object.keys(actividadPorMes);
    const actividad = Object.values(actividadPorMes);
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: meses,
        datasets: [
          {
            label: this.apiActivityLabel, // Usa la variable de localización
            data: actividad,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(202, 202, 202, 0.2)',
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${this.apiActivityLabel} ${this.byMonthLabel}`, // Usa las variables de localización
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getUserError() {
    this.logService.getErrorQuantity().subscribe(res => {
      if (typeof res === 'number') {
        this.error = res;
      }
    });
  }

  getTotalUsers() {
    this.logService.getTotalUsers().subscribe(res => {
      if (typeof res === 'number') {
        this.totalUsers = res;
      }
    });
  }

  getAverageExecutionDuration() {
    this.logService.getAverageExecutionDuration().subscribe(res => {
      if (typeof res === 'number') {
        this.executionDuration = res;
      }
    });
  }

}