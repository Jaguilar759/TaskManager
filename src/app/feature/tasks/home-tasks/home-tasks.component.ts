import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicTableComponent, BreadcrumbComponent } from '@shared/components';
import { TableColumn } from '@shared/models';
import { LenguageTranslatorService, TasksService } from '@shared/services';
import { MatDialog } from '@angular/material/dialog';
import { ActionTasksComponent } from '../action-tasks/action-tasks.component';

@Component({
  selector: 'app-home-tasks',
  imports: [
    BreadcrumbComponent,
    BasicTableComponent
  ],
  templateUrl: './home-tasks.component.html',
  styleUrl: './home-tasks.component.scss'
})
export class HomeTasksComponent implements OnInit{

  dialog = inject(MatDialog);
  router = inject(Router);
  tasksServices = inject(TasksService);
  languageService = inject(LenguageTranslatorService);

  isLoadingResults = false;

  tableData = [];
  displayedColumns: string[] =  ['title', 'description', 'status', 'createdDate', 'updatedDate'];
  columHeader: TableColumn = {
    title: 'title', 
    description: 'description',
    status: 'status',
    createdDate: 'createdDate',
    updatedDate: 'updatedDate', 
  };
  
  actionsInputsColumn = [
      { action: 'update', icon: 'edit', tooltip: 'update'},
      { action: 'delete', icon: 'delete', tooltip: 'delete'},
  ]

  
  ngOnInit(): void {
      this.loadData();
  }

  handleSelectAction(event: any): void {
    switch(event.action) {
      case 'delete':
        this.deleteTask(event.data.id);
        break;
      case 'update':
        this.actionTask(event.data.id);
        break;
    }
  }

  actionTask(id: number){
    let dialogRef = this.dialog.open(ActionTasksComponent, {
      data: { idTask: id },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.loadData();
      }
    })
  }

  deleteTask(id: number){
    this.isLoadingResults = true;
    this.tasksServices.deleteTask(id).subscribe({
      next: () => {
        this.isLoadingResults = false;
        this.loadData();
      },
      error: (error) => { this.isLoadingResults = false; }
    });
  }

  handleNewRecord(){
    this.actionTask(null);
  }

  loadData(){
    this.tasksServices.getTasks().subscribe((data) => {

      const languageCode = this.languageService.getLenguageCode() || 'es-ES';

      const formatDate = (date: string) => 
        new Date(date).toLocaleString(languageCode, { 
          dateStyle: 'short', 
          timeStyle: 'medium', 
          hour12: false 
        });

      this.tableData = data.map(x => {
        return {
          id: x.id,
          title: x.title,
          description: x.description,
          status: x.taskStatus.statusName,
          createdDate: formatDate(x.createdDate),
          updatedDate: formatDate(x.updatedDate)
        }
      });
      this.isLoadingResults = false;
    });
  }
}
