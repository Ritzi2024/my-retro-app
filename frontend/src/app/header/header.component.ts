import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subject, filter, tap } from 'rxjs';
import { HeaderService } from './header.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showCompleted: boolean = false;
  pageTitle$;
  constructor(private service: HeaderService){
    this.pageTitle$ = this.service.setTitleSubject$.pipe(
      tap(x => console.log("header one", x))
    );

  }
  // showCompletedSubject = new Subject<boolean>();
  // public showCompletedSubject$ = this.showCompletedSubject.asObservable();



  onShowCompletedChange(event: MatSlideToggleChange){
    const isChecked = event.checked;
    this.service.showCompletedSubject.next(isChecked);
  }

  addNewTodo(){

  }
  addNewCriteria(){

  }
  toggleNavMenu(){
    this.service.showSideBarSubject.next();
  }
}
