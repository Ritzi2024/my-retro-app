import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EchartsComponent } from './echarts/echarts.component';
import { PieChartComponent } from './echarts/pie-chart/pie-chart.component';
import { MixLineBarStackChartComponent } from './echarts/mix-line-bar-stack-chart/mix-line-bar-stack-chart.component';
import { LineChartComponent } from './echarts/line-chart/line-chart.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    ActionButtonComponent,
    EchartsComponent,
    PieChartComponent,
    MixLineBarStackChartComponent,
    LineChartComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatExpansionModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    NgxEchartsDirective,
    MatDatepickerModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatExpansionModule,
    MatSidenavModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ActionButtonComponent,
    EchartsComponent,
    MatDatepickerModule
  ],
  providers: [provideEcharts()]
})
export class SharedModule { }
