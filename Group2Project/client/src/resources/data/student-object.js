import {
  inject
} from 'aurelia-framework';
import {
  DataServices
} from './data-services';

@inject(DataServices)
export class Student {

  constructor(data) {
    this.data = data;
    this.STUDENTS_SERVICE = 'students';
  }

  async saveStudents(students) {
    if (students) {
      let serverResponse = await this.data.post(students, this.STUDENTS_SERVICE);
      return serverResponse;
    }
  }
}
