import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-mix-line-bar-stack-chart',
  templateUrl: './mix-line-bar-stack-chart.component.html',
  styleUrls: ['./mix-line-bar-stack-chart.component.scss']
})
export class MixLineBarStackChartComponent implements OnInit {
  keys: string[] = [];
  timeArr: string[] = [];
  ngOnInit(): void {
    const series = this.createChartData();
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: this.keys
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: this.timeArr
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series
    }
  }
  @Input() height: number | undefined;
  @Input() data: any;

  createChartData() {
    const seriesData: any[] = [];
    const keys = Object.keys(this.data[0]).filter(k => k !== "_id");
    this.timeArr = Object.keys(this.data[0]).filter(k => k == "_id");
    this.keys = keys;
    keys.forEach(key => {
      seriesData.push({
        name: key,
        type: 'bar',
        stack: key,
        emphasis: {
          focus: 'series'
        },
        data: this.data.map((k: any) => k[key])
      })
    })
    return seriesData;
  }

  labelOption = {
    show: true,
    position: 'insideBottom',
    distance: 15,
    verticalAlign: 'middle',
    rotate: 90,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {}
    }
  };
  option: any = {};
}
