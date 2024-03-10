import { Observable, find, last, map } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import IDashboardCount from '../interfaces/IDashboardCount';
import { TODOS_CRITERIA } from '../enums/dashboard';
import MathUtil from '../utils/math';
import ITodo from '../interfaces/IDashboardCount';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  dashboardCard$?: Observable<IDashboardCount[]>;
  dashboardCard: IDashboardCount[] = [];
  firstFourItems$?: Observable<IDashboardCount[]>;
  lastItems$?: Observable<IDashboardCount[]>;
  TODOS_CRITERIA!: TODOS_CRITERIA;
  constructor(private service: DashboardService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.service.getDashboardCount().subscribe(data => {
    //   const dashboardCards: IDashboardCount[] = [];
    //   const today = new Date().toDateString();

    //   data.getTodoCounts.forEach(item => {
    //     const resolutionDate = new Date(item._id).toDateString();
    //     const daysDiff = MathUtil.diffDays(resolutionDate, new Date().toDateString())
    //     if (resolutionDate === today) {
    //       this.checkForDate(item, dashboardCards, "TODAY");
    //     } else if (daysDiff >= 1 && daysDiff < 2) {
    //       this.checkForDate(item, dashboardCards, "TOMORROW");
    //     } else if (daysDiff >= 1 && daysDiff <= 7) {
    //       this.checkForDate(item, dashboardCards, "WEEKLY");
    //     } else if (daysDiff >= 1 && daysDiff <= 30) {
    //       this.checkForDate(item, dashboardCards, "MONTHLY");
    //     } else {
    //       this.checkForDate(item, dashboardCards, "LIFE");
    //     }
    //   });
    //   console.log(dashboardCards);
    //   this.dashboardCard = [...dashboardCards];
    //   this.cd.detectChanges();
    // })
    // this.firstFourItems$ = this.dashboardCard$.pipe(map(items => items.slice(0, 4)));
    // this.lastItems$ = this.dashboardCard$.pipe(map(items => items.slice(4, 5)));

    this.dashboardCard$ = this.service.getDummyDashboardCount();
  }

  checkForDate(item: any, cards: any[], tag: string) {
    console.log(tag);
    //const key = TODOS_CRITERIA[tag as string] ; //Object.keys(TODOS_CRITERIA)[Object.values(TODOS_CRITERIA)[tag]];
    let index = cards.findIndex(x => x.title === tag);
    if (index === -1) {
      cards.push({
        title: tag,
        count: 0,
        activeCount: 0,
        category: TODOS_CRITERIA.LIFE,

      });
      index = cards.length - 1;
    }

    item.todos.forEach((todo: ITodo) => {
      cards[index].count++;
      if (!todo.completed) {
        cards[index].activeCount++;
      }
    });
    return cards;
  }




}
