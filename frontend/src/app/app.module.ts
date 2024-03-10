import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { DatePipe } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { GraphQLModule } from './graphql.module';
import { SharedModule } from './shared/shared.module';
import { DashboardCountCardComponent } from './dashboard/dashboard-count-card/dashboard-count-card.component';
import { TodoModule } from './todo/todo.module';
import { RetroModule } from './retro/retro.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    StatisticsComponent,
    DashboardCountCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DatePipe,
    GraphQLModule,
    SharedModule,
    TodoModule,
    RetroModule,
    CategoryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
