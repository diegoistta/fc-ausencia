import { Categoria } from '@app/_model/categoria';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpUrlEncodingCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '@app/app.config';
import { encodeUriQuery } from '@angular/router/src/url_tree';
import { encode } from 'punycode';


@Injectable()
export class CategoriaService {
  constructor(private http: HttpClient, private config: AppConfig ) { }

  getCategorias(search = '', columns = ['Nome'], sortColumn = 'Nome', sortDirection = 'asc',
      pageNumber = 0, pageSize = 5): Observable<Categoria[]> {

        let params = new HttpParams()
        .set('search', search)
        .set('sortColumn', sortColumn)
        .set('sortDirection', sortDirection)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());

        columns.forEach(element => {
           params = params.append('columns', element);
        });

        return this.http.get(this.config.apiUrl + '/categoria/filtro', { params })
        .pipe(map((res: any) => res.data));
  }

  salvarCategoria(categoria: Categoria): Observable<Categoria> {
     return this.http.post(this.config.apiUrl + '/categoria', { Nome: categoria.nome } )
     .pipe(map((res: any) => res));
  }

  atualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put(this.config.apiUrl + '/categoria', categoria)
    .pipe(map((res: any) => res));
 }

  deleteCategoria(id): Observable<any> {

    const params = new HttpParams()
        .set('id', id);

    return this.http.delete(this.config.apiUrl + '/categoria', { params })
    .pipe(map((res: any) => res));
  }
}
