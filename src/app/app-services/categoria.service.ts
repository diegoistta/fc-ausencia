import { Categoria } from '../app-model/categoria';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../app.config';

@Injectable()
export class CategoriaService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  getCategorias() {
    return this.http.get<Categoria[]>(this.config.apiUrl + '/listar-categorias');
  }

}
