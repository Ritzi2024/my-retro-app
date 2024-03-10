import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Observable, map, tap } from 'rxjs';
import IRetro from 'src/app/interfaces/IRetro';
import { ApiUtilsService } from 'src/app/utils/api-utils';

@Injectable({
  providedIn: 'root'
})
export class RetroService {

  constructor(private utils: ApiUtilsService) { }

  getRetro(_id: string | null): Observable<IRetro> {
    const query = `GetRetro($id: ID) {
      getRetro(ID: $id) {
        _id
        title
        actions {
          taskId
          title
        }
        date
        good
        ok
      }
    }
    `;
    return this.utils.apolloQuery$(query, { id: _id })
      .pipe(
        map(result => (result.data as any).getRetro as IRetro)
      );
  }

  getRetros(): Observable<IRetro[]> {
    const query = `GetRetros {
      getRetros {
        actions {
          title
        }
        _id
        date
        title
      }
    }
    `;
    return this.utils.apolloQuery$(query, null)
      .pipe(
        tap(x => console.log(x)),
        map(result => (result.data as any).getRetros as IRetro[])
      );
  }

  saveTodo(retro: IRetro): Observable<IRetro> {
    const m = gql `mutation Mutation($retroInput: RetroInput) {
      createRetro(retroInput: $retroInput) {
        _id
      }
    }`;
    return this.utils.apolloMutation$(m, { retroInput: retro })
    .pipe(
      map(result => (result.data as any).createRetro as IRetro)
    );
  }

  updateRetro(id: string, retro: IRetro): Observable<IRetro> {
    const m = gql`mutation EditTodo($id: ID!, $retroInput: RetroInput) {
      editTodo(ID: $id, retroInput: $retroInput){
        _id
        title
      }
    }
    `;
    return this.utils.apolloMutation$(m, { id, retroInput: retro })
    .pipe(
      map(result => (result.data as any).editRetro as IRetro)
    );
  }
}
