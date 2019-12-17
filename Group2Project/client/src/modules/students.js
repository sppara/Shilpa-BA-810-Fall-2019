import {
  inject
} from 'aurelia-framework';
import {
  Router
} from 'aurelia-router';
import {
  Student
} from '../resources/data/student-object';

@inject(Router, Student)
export class Students {
  constructor(router, students) {
    this.router = router;
    this.students = students;
    this.message = 'Register an Account';
  }

  newStudents() {
    this.students = {
      firstName: '',
      lastName: '',
      active: true,
      role: 'students',
      email: '',
      password: ''
    }
  }

  async save() {
    if (this.students && this.students.firstName && this.students.lastName &&
      this.students.email && this.students.password) {
      await this.students.saveStudents(this.students);

      this.router.navigate('home')
    }
  }

  logout() {
    this.router.navigate('home');
  }
}
