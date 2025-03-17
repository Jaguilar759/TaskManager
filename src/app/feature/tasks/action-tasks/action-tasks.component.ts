import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, TextComponent, RadioButtonComponent } from '@shared/components';
import { BreadcrumbRoute } from '@shared/models';
import { TasksService } from '@shared/services';

@Component({
  selector: 'app-action-tasks',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    TextComponent,
    ButtonComponent,
    RadioButtonComponent,
    MatRadioModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './action-tasks.component.html',
  styleUrl: './action-tasks.component.scss'
})
export class ActionTasksComponent implements OnInit {
  
  dialogRef = inject(MatDialogRef<ActionTasksComponent>);
  dialogData = inject(MAT_DIALOG_DATA);
  animal = model(this.dialogData.animal);

  activatedRoute = inject(ActivatedRoute);
  tasksService = inject(TasksService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  idTask: number;
  formTask = signal<FormGroup>(null);
  actionTask = signal<string>('');
  isLoading = signal<boolean>(false);
  savingInformation = signal<boolean>(false);
  options = signal([
    {label: 'pending', value: 1},
    {label: 'completed', value: 2}
  ])

  routes = signal<BreadcrumbRoute[]>([
    { label: 'home', url: '/', icon: 'bi bi-house-door' },
    { label: 'tasks', url: '/tasks'}
  ])

  constructor(
  ){}

  ngOnInit(): void {
    this.buildForm();
    this.idTask = +this.dialogData.idTask!;
    if(this.idTask) {
      this.actionTask.set('updateTask');
      this.loadTask();
    } else {
      this.actionTask.set('createTask');
    }
    this.routes.update((routes) => [...routes, { label: this.actionTask()}]);
  }

  private loadTask() {
    this.isLoading.set(true);
    this.tasksService.getTask(this.idTask).subscribe({
      next: (data) => {
        this.isLoading.set(false);
        this.formTask().patchValue({ title: data.title, description: data.description, status: data.statusId });
        Object.keys(this.formTask().controls).forEach(controlName => {
          if (controlName !== 'status') {
            this.formTask().get(controlName)?.disable();
          }
        });
      },
      error: () => this.isLoading.set(false),
      complete: () => { }
    });
  }

  buildForm(): void {
    this.formTask.set(this.formBuilder.group({
        title: [null, [Validators.required, Validators.maxLength(256), Validators.minLength(5)]],
        description: [null, [Validators.required, Validators.maxLength(500),  Validators.minLength(5)]],
        status: [null, [Validators.required]],
    }));
  }

  submitForm(): void {
    if(this.formTask().invalid) {
      this.formTask().markAllAsTouched();
      this.formTask().markAsDirty();
    } else {

      if(this.idTask){
        this.updateTask();
      } else{
        this.createTask();
      }
    }
    
  }

  updateTask(){
    this.savingInformation.set(true);
    let dataTask = this.formTask().value;
    this.tasksService.updateTask(this.idTask, dataTask.status).subscribe({
      next: () => {
        this.savingInformation.set(false);
        this.dialogRef.close(dataTask);
        },
      error: () => this.savingInformation.set(false),
      complete: () => { }
    });
  }

  createTask(){
    this.savingInformation.set(true);
    let dataTask = {...this.formTask().value};
    dataTask.statusId = dataTask.status;

    this.tasksService.createTask(dataTask).subscribe({
      next: () => {
        this.savingInformation.set(false);
        this.dialogRef.close(dataTask);
      },
      error: () => this.savingInformation.set(false),
      complete: () => { }
    });
  }

  cancel(){
    this.dialogRef.close();
  }

  clearForm(){
    this.formTask().reset();
  }
}
