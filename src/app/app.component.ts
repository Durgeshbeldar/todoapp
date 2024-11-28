import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Manager';
  tasks: any[] = [];
  selectedTask: any = null;
  showModal: boolean = false;
  tasksToBeDisplayed : any[] = [];
  constructor() {
    this.loadTasks();
  }

  loadTasks(){
    const localTasks = localStorage.getItem('tasks');
    if (localTasks) {
      this.tasks = JSON.parse(localTasks); // Parse JSON data from localStorage
      this.tasksToBeDisplayed = this.tasks; // Copy tasks array to display in table
    }
  }
  toDoListForm = new FormGroup({
    taskName: new FormControl('', Validators.required),
    description: new FormControl(),
    priority: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
  })

  // Function To Get Data From Task Form Entered By User..
  submitTask() {
    if (this.toDoListForm.valid) {
      const newTask = {
        taskName: this.toDoListForm.value.taskName!,
        description: this.toDoListForm.value.description,
        priority: this.toDoListForm.value.priority,
        deadline: this.toDoListForm.value.deadline,
      }
      this.tasks.push(newTask);
      this.updateLocalStorage();
      alert("Task Added Successfully");
      this.toDoListForm.reset();
    }
  }
  deleteTask(index: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  // Show task details in a popup/modal
  viewTask(task: any): void {
    this.selectedTask = task;
    this.showModal = true;
  }
  sortTasks(priority: any) {
    const filteredTasks = this.tasks.filter(task => task.priority === priority);
    if (filteredTasks.length > 0) {
      this.tasks = filteredTasks;
    } else {
      alert("No Tasks Available with priority : " + priority);
    }
  }
  showAll(){
    this.loadTasks();
  }
  // Close the modal
  closeModal(): void {
    this.showModal = false;
    this.selectedTask = null;
  }
  // Update task details in local storage
  private updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
