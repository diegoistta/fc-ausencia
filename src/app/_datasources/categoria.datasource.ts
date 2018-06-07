import { of } from 'rxjs/observable/of';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { CategoriaService } from '@app/_services/categoria.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Categoria } from '@app/_model/categoria';



export class CategoriaDataSource implements DataSource<Categoria> {

    private categoriaSubject = new BehaviorSubject<Categoria[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public totalRecords = 0;

    constructor(private categoriaService: CategoriaService) {

    }

    getCategorias(
                search: string,
                columns: string[],
                sortColumn: string,
                sortDirection: string,
                pageIndex: number,
                pageSize: number) {

        this.loadingSubject.next(true);

        this.categoriaService.getCategorias(search, columns, sortColumn, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((x: any) => {
                this.categoriaSubject.next(x.tableData);
                this.totalRecords = x.totalRecords;
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<Categoria[]> {
        return this.categoriaSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.categoriaSubject.complete();
        this.loadingSubject.complete();
    }

}

