import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, delay, tap, throwError } from "rxjs";
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult, DocumentNode } from "@apollo/client/core";

@Injectable({
  providedIn: 'root',
})
export class ApiUtilsService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  public readonly loadingSubject$ = this.loadingSubject.asObservable();

  constructor(private apollo: Apollo) { }
  apiCall$<T>(httpCall: Observable<T>, options?: { skipErrorHandling?: boolean }): Observable<T> {
    if (options && options.skipErrorHandling) {
      return httpCall;
    } else {
      return httpCall.pipe(
        catchError(error => {
          return throwError(this.handleHttpError(error));
        }),
      );
    }
  }
  handleHttpError(error: any): any {
    console.log(error);
    throw error;
  }
  apolloQuery$<T>(q: string, payload: any, options?: { skipErrorHandling?: boolean }): Observable<ApolloQueryResult<unknown>> {
    this.loadingSubject.next(true);
    const queryCall$ = this.apollo
      .watchQuery({
        query: gql`
          query ${q}
          `,
        variables: payload,
      }).valueChanges;

    if (options && options.skipErrorHandling) {
      return queryCall$.pipe(
        tap(() => this.loadingSubject.next(false)),
      );
    } else {
      return queryCall$.pipe(
        tap(() => this.loadingSubject.next(false)),
        catchError(error => {
          this.loadingSubject.next(false);
          return throwError(this.handleHttpError(error));
        }),
      );
    }
  }
  apolloMutation$<T>(m: DocumentNode, payload: any, options?: { skipErrorHandling?: boolean }) {
    this.loadingSubject.next(true);
    const mutateCall$ = this.apollo.mutate({
      mutation: m,
      variables: payload,
    });

    if (options && options.skipErrorHandling) {
      return mutateCall$.pipe(
        tap(() => this.loadingSubject.next(false)),
      );
    } else {
      return mutateCall$.pipe(
        tap(() => this.loadingSubject.next(false)),
        catchError(error => {
          this.loadingSubject.next(false)
          return throwError(this.handleHttpError(error));
        }),
      );
    }
  }
}
