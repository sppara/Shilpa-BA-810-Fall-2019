import {
  inject
} from 'aurelia-framework';

import {
  Todo
} from '../resources/data/todo-object';

@inject(Todo)
export class Todos {
  constructor(todo) {
    this.todo = todo;
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.statuses = ['Todo', 'In Process', 'Completed'];
    this.isCheckedCompleted = true;
  }

  async attached() {
    await this.getTodos();
  }

  async getTodos() {
    await this.todo.getTodos(this.userObj._id);
    this.showForm = false;
  }

  updateTodo(todo) {
    this.todo.selectedTodo = todo;
    this.saveTodo();
  }

  editTodo(todo) {
    this.todo.selectedTodo = todo;
    this.showForm = true
  }

  newTodo() {
    this.todo.newTodo(this.userObj._id);
    this.showForm = true;
  }

  async saveTodo() {
    await this.todo.saveTodo()
    this.getTodos();
  }

  async deleteTodo(wigdet) {
    await this.todo.deleteTodo(wigdet._id)
    this.getTodos();
  }

  Cancel() {
    this.showForm = false;
  }

}
