import { Component, OnInit } from '@angular/core';
import {ChartDataset, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {

  public chartData: ChartDataset[] = [
    {
      data: [
        {x: 1, y: 3},
        {x: 2, y: 4},
        {x: 3, y: 3},
        {x: 4, y: 6},
        ],
      label: 'Series A',
      pointRadius: 5
    }
  ];

  public chartOptions: ChartOptions = {
    responsive: true
  }

  public chartType: ChartType = 'scatter';

  constructor() { }

  ngOnInit(): void {
  }

}
