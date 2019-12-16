import {
  inject
} from 'aurelia-framework';
import {
  Router
} from 'aurelia-router';

import {
  User
} from '../resources/data/user-object';

import {
  AuthService
} from 'aurelia-auth';

@inject(Router, User, AuthService)
export class Home {
  // constructor(router) {
  //   this.router = router;
  // }

  // login() {
  //   this.router.navigate('users');
  // }

  constructor(router, users, auth) {
    this.users = users;
    this.message = 'Home';

    this.authenticated = false;
    this.router = router;
    this.auth = auth;
    this.loginError = '';
    this.email = "";
    this.password = "";

    // this.message = 'Register an Account';
  }

  newUser() {
    this.user = {
      firstName: '',
      lastName: '',
      active: true,
      role: 'user',
      email: '',
      password: ''
    }
  }

  async save() {
    if (this.user && this.user.firstName && this.user.lastName &&
      this.user.email && this.user.password) {
      await this.users.saveUser(this.user);

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
        this.userObj = response.user;
        sessionStorage.setItem('userObj', JSON.stringify(this.userObj));
        this.loginError = "";
        this.authenticated = this.auth.isAuthenticated();
        this.router.navigate('todos');

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
