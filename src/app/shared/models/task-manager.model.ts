import { TaskStatus } from "./task-status.model";

export class TaskManager {
    id?:          number;
    title:        string;
    description:  string;
    statusId:     number;
    createdDate?: string;
    updatedDate?: string;
    taskStatus?:  TaskStatus;
}
  