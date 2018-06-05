import { Categoria } from '@app/_model/categoria';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '@app/app.config';

@Injectable()
export class CategoriaService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  getCategorias(search = '', columns = ['Nome'], sortColumn = 'Nome', sortDirection = 'asc',
      pageNumber = 0, pageSize = 5): Observable<Categoria[]> {
        return this.http.post(this.config.apiUrl + '/data-table-categorias',
                              {
                                 search,
                                 columns,
                                 sortColumn,
                                 sortDirection,
                                 pageNumber,
                                 pageSize
                              }
                            ).pipe(map((res: any) => res.data));
  }

  deleteCategoria(id = 0): Observable<any> {
    return this.http.delete(this.config.apiUrl + '/delete-categoria?id=' + id)
    .pipe(map((res: any) => res));
  }
}
