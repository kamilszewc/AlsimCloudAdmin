import {Component, OnInit, ViewChild} from '@angular/core';
import {BubbleDataPoint, ChartDataset, ChartOptions, ChartType, ScatterDataPoint} from "chart.js";
import {HeaderDescription, UserStatisticsService} from "./user-statistics.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {

  @ViewChild('timeRangePickerForm') timeRangePickerForm!: NgForm;
  timeRangeOptions: Map<string, number | null>;
  timeRangeNames!: string[];

  chosenTimeRange = "since beginning";

  public headers!: string[];
  public chartDatasets!: Map<string, ChartDataset[]>;
  public chartLabels!: Map<string, string[]>;
  public chartOptions!: Map<string, ChartOptions>;
  public chartType: ChartType = 'line';

  constructor(private userStatisticsService: UserStatisticsService) {
    this.timeRangeOptions = new Map<string, number | null>();
    this.timeRangeOptions.set("since beginning", null)
    this.timeRangeOptions.set("last week", 7)
    this.timeRangeOptions.set("last month", 31)
    this.timeRangeOptions.set("last year", 365)
    this.timeRangeNames = Array.from(this.timeRangeOptions.keys());
  }

  ngOnInit(): void {
    this.getPlotsData(null);
  }

  getPlotsData(timeRange: number | null): void {
    this.chartDatasets = new Map<string, ChartDataset[]>()
    this.chartLabels = new Map<string, string[]>()
    this.chartOptions = new Map<string, ChartOptions>()

    this.userStatisticsService.generateAnalyticsGrabberToken().subscribe(response => {
      let token = response.message;
      console.log(token)

      this.userStatisticsService.getHeadersForPlotting(token).subscribe(headers => {

        this.headers = [];

        for (const [key, value] of Object.entries(headers)) {

          this.headers.push(key);

          this.userStatisticsService.getDataForPlotting(key, token, timeRange).subscribe(plot => {

            let x = plot.x;
            let y = plot.y;

            const chartDataset : ChartDataset[] = [
              {
                data: y,
                label: plot.title,
                pointRadius: 5
              }
            ];

            let chartOption: ChartOptions = {
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: plot.xlabel
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: plot.ylabel
                  }
                }
              }
            }

            this.chartDatasets.set(key, chartDataset);
            this.chartLabels.set(key, x);
            this.chartOptions.set(key, chartOption);
          })
        }

      })
    })
  }

  selectedTimeRange() {
    const timeRange = this.timeRangeOptions.get(this.chosenTimeRange);
    this.getPlotsData(timeRange!)
  }

}
