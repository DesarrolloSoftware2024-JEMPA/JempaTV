import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerieDto, SerieService } from '@proxy/series';


@Component({
  selector: 'app-series-detail-component',
  standalone: true,
  imports: [],
  templateUrl: './series-detail.component.html',
  styleUrl: './series-detail.component.scss'
})
export class SeriesDetailComponentComponent implements OnInit {
  seriesId!: number;
  serie: SerieDto;

  constructor(private serieService: SerieService, private route: ActivatedRoute){

  }

  ngOnInit(): void {

    this.seriesId = Number(this.route.snapshot.paramMap.get('id'));
    this.serieService.get(this.seriesId).subscribe(x => this.serie = x);

  }
}
