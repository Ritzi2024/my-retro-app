import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  showCompletedSubject = new Subject<boolean>();
  public showCompletedSubject$ = this.showCompletedSubject.asObservable();

  showSideBarSubject = new Subject<void>();
  public showSideBarSubject$ = this.showSideBarSubject.asObservable();

  setTitleSubject = new ReplaySubject<string>(1);
  public setTitleSubject$ = this.setTitleSubject.asObservable();

  constructor() { }
}
