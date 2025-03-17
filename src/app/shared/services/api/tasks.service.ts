import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TaskManager } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  readonly API_URL = `${environment.apiUrl}/TaskManager`;

  private http: HttpClient = inject(HttpClient);

  getUserExample(sort: string, order: string, page: number): Observable<any> {
    const href = `https://rickandmortyapi.com/api/character?page=${page}`;

    return this.http.get<any>(href);
  }

  getTasks(): Observable<TaskManager[]> {
    return this.http.get<TaskManager[]>(this.API_URL);
  }

  getTask(id: number): Observable<TaskManager> {
    return this.http.get<TaskManager>(`${this.API_URL}/${id}`);
  }

  createTask(task: TaskManager): Observable<number> {
    return this.http.post<number>(this.API_URL, task);
  }

  updateTask(id: number, statusId: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}?statusId=${statusId}`, {});
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
  
}
