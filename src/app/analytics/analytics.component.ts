import { Component, OnInit } from '@angular/core';
import {ChartDataset, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

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
