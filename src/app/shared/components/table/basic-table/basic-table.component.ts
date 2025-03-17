import { Component, Input, input, OnDestroy, OnInit, output, signal, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { InputActionColumn, TableColumn } from '@shared/models';
import { ButtonComponent } from '@shared/components';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-basic-table',
  imports: [
    TranslateModule,
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
],
  templateUrl: './basic-table.component.html',
  styleUrl: './basic-table.component.scss'
})
export class BasicTableComponent implements OnInit, OnDestroy  {

  private destroy$ = new Subject<void>();
  
  public filterControl = new FormControl(null);
  public dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  actionsInputsColumn = input<InputActionColumn[]>();
  columnHeaders = input<TableColumn>();
  columnsToDisplay = signal<string[]>([]);
  defaultPageSize = input(10);
  displayedColumns = input<string[]>([]);
  isLoadingResults = input<boolean>(false);
  paginationSizes = input([5, 10, 20]);
  showButtonNewRecord = input<boolean>(false);

  @Input() set tableData(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buttonNewEvent = output<boolean>();
  buttonActionEvent = output<any>();

  ngOnInit() {
    this.columnsToDisplay.set(this.displayedColumns());
    if(this.actionsInputsColumn() && this.actionsInputsColumn().length > 0){
      let columns = this.displayedColumns();
      const newcolumnsToDisplay = ["select", ...columns];
      this.columnsToDisplay.set(newcolumnsToDisplay)
    }

    this.filterControl.valueChanges.pipe(takeUntil(this.destroy$))
    .subscribe((value) => {
      if(!value?.trim()) return;

      this.dataSource.filter = value;
      if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  emitActionButtonNew() {
    this.buttonNewEvent.emit(true);
  }

  emitSelectAction(actionData: InputActionColumn, data: any) {
    this.buttonActionEvent.emit({action: actionData.action, data});
  }
}