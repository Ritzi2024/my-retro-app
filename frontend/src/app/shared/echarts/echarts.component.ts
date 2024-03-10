import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ECHART_TYPE } from 'src/app/enums/dashboard';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent {

  @Input() type: ECHART_TYPE | undefined;
  @Input() data: any;
  @Input() title: string | undefined;
  @Input() height: number | undefined;

  readonly ChartType = ECHART_TYPE;
}

