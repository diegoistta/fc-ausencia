import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { Categoria } from '@app/_model/categoria';

import { ElementRef } from '@angular/core';
import { CategoriaDataSource } from '@app/_datasources/categoria.datasource';
import { fromEvent, merge } from 'rxjs';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import { Inject } from '@angular/core';

import { CategoriaService } from '@app/_services/categoria.service';
import { ExclusaoDialogComponent } from '@app/layout/dialogs/exclusao/exclusao-dialog.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent implements OnInit {

  dataSource: CategoriaDataSource;
  categoria: string;

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
        )
        .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadCategoriasPage())
    ).subscribe();
  }

  openDialog(row) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.panelClass = 'modal-warning';

    const dialogRef = this.dialog.open(ExclusaoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
          if (data) {
            console.log(row['id']);
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
