import { Injectable } from '@angular/core';
import IDashboardCount, { IDashboardResponse } from '../interfaces/IDashboardCount';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map, of } from 'rxjs';
import { BASE_URL } from '../constants';
import { gql } from '@apollo/client/core';
import { ApiUtilsService } from '../utils/api-utils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient, private utils: ApiUtilsService) { }

  getDummyDashboardCount(): Observable<any[]> {
    return of([
      {
        title: "Today",
        count: 10,
        activeCount: 5
      },
      {
        title: "Tomorrow",
        count: 20,
        activeCount: 7
      },
      {
        title: "This week",
        count: 30,
        activeCount: 5
      },
      {
        title: "This month",
        count: 56,
        activeCount: 15
      }
    ])
  }
  getDashboardCount(): Observable<IDashboardResponse> {
    //return this.http.get<IDashboardCount[]>(`${BASE_URL}/dashboardCounts`);
    const query = `Query {
      getTodoCounts {
        _id
        todos {
          _id
          title
          category
        }
      }
    }`;
    //return this.utils.apiCall$(this.http.get<ITodo[]>(`${this.baseUrl}`));
    return this.utils.apolloQuery$(query, null)
      .pipe(
        map(result => result.data as IDashboardResponse)
      );

  }
}
