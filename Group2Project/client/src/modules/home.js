import {
  inject
} from 'aurelia-framework';
import {
  Router
} from 'aurelia-router';

import {
  Student
} from '../resources/data/student-object';

import {
  AuthService
} from 'aurelia-auth';

@inject(Router, Student, AuthService)
export class Home {


  constructor(router, students, auth) {
    this.students = students;
    this.message = 'Home';

    this.authenticated = false;
    this.router = router;
    this.auth = auth;
    this.loginError = '';
    this.email = "";
    this.password = "";

    // this.message = 'Register an Account';
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


  attached() {
    $('.navbar-nav a').on('click', function () {
      $('.navbar-nav').find('li.active').removeClass('active');
      $(this).parent('li').addClass('active');
    });

    let Navigate = document.querySelectorAll('.navigate');

    for (let v of Navigate) {
      v.onclick = function () {
        if (v.hash) {
          document.querySelector(v.hash).scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
          });

          return false
        }
      }
    }
  }

  login() {
    return this.auth.login(this.email, this.password)
      .then(response => {
        console.log(response)
        this.studentObj = response.user;
        sessionStorage.setItem('studentObj', JSON.stringify(this.studentObj));
        this.loginError = "";
        this.authenticated = this.auth.isAuthenticated();
        this.router.navigate('courses');

        location.reload()
      })
      .catch(error => {
        console.log(error);
        this.authenticated = false;
        this.loginError = 'Invalid credentials';
      });
  }

  bind() {
    this.authenticated = this.auth.isAuthenticated();
  }
}
