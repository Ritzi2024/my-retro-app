import { MatDrawer } from '@angular/material/sidenav';
import { HeaderService } from './../../header/header.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(MatDrawer, { static: true })
  drawer!: MatDrawer;

  constructor(private headerService: HeaderService, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(''),
      map(()=>{
        let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot?.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }else{
            routeTitle = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['title']: 'My Todo';
          }
          return routeTitle;
      })
    ).subscribe((title: string) => {
      console.log("whats here", title);
      if (title) {
        this.headerService.setTitleSubject.next(`My App - ${title}`);
      }
      this.drawer?.close();
    });
  }
  ngOnInit(): void {
    this.headerService.showSideBarSubject$.subscribe(() => {
      if (this.drawer?.opened) {
        this.drawer.close();
      } else {
        this.drawer.open();
      }
    })
  }


}
