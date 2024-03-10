import { Observable } from 'rxjs';
import { ApiUtilsService } from './utils/api-utils';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-retro-app';
  isLoading$: Observable<boolean> | undefined;
  constructor(private apiUtilService: ApiUtilsService){

  }
  ngOnInit(): void {
    //this.isLoading$ = this.apiUtilService.loadingSubject$;
  }

}
