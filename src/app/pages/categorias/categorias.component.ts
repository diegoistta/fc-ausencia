import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { Categoria } from '@app/_model/categoria';

import { ElementRef } from '@angular/core';
import { CategoriaDataSource } from '@app/_datasources/categoria.datasource';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay, catchError } from 'rxjs/operators';
import { Inject } from '@angular/core';

import { CategoriaService } from '@app/_services/categoria.service';
import { ExclusaoDialogComponent } from '@app/layout/dialogs/exclusao/exclusao-dialog.component';
import { EditarCategoriaComponent } from '@app/layout/dialogs/editar-categoria/editar-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})

export class CategoriasComponent implements OnInit, AfterViewInit {

  dataSource: CategoriaDataSource;

  displayedColumns = ['nome', 'dataCriacao', 'dataAlteracao', 'opcoes'];
  searchColumns = ['nome'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private categoriaService: CategoriaService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.dataSource = new CategoriaDataSource(this.categoriaService);

    this.dataSource.getCategorias('', this.searchColumns, this.sort.active,
     this.sort.direction, 0, this.paginator.pageSize);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
              debounceTime(150),
              distinctUntilChanged(),
              tap(() => {
                  this.paginator.pageIndex = 0;
                  this.loadCategoriasPage();
                })
            ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadCategoriasPage())
    ).subscribe();
  }


  criarDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.panelClass = 'modal-edit-single';
    dialogConfig.data = {
      descricao: 'Criar Categoria',
      id: 0,
      nome: ''
    };

    const dialogRef = this.dialog.open(EditarCategoriaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: Categoria) => {
          if (data) {
            this.categoriaService.salvarCategoria(data).pipe(
              tap(() => this.loadCategoriasPage())
           ).subscribe();
        }
      }
    );
  }

  editarDialog(row) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.panelClass = 'modal-edit-single';
    dialogConfig.data = {
        descricao: 'Editar Categoria',
        id: row.id,
        nome: row.nome
      };

    const dialogRef = this.dialog.open(EditarCategoriaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: Categoria) => {
          if (data) {

            if (row.id) {
              this.categoriaService.atualizarCategoria(data).pipe(
                tap(() => this.loadCategoriasPage())
             ).subscribe();
            } else {
              this.categoriaService.salvarCategoria(data).pipe(
                tap(() => this.loadCategoriasPage())
             ).subscribe();
            }
        }
      }
    );
  }

  excluirDialog(row) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.panelClass = 'modal-warning';

    const dialogRef = this.dialog.open(ExclusaoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
          if (data) {
            this.categoriaService.deleteCategoria(row['id']).pipe(
              tap(() => this.loadCategoriasPage())
           ).subscribe();
        }
      }
    );
  }

  loadCategoriasPage() {
    this.dataSource.getCategorias(
        this.input.nativeElement.value,
        this.searchColumns,
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }
}
