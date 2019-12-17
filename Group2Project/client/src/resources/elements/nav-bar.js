import {
  inject
} from 'aurelia-framework';
import {
  Router
} from 'aurelia-router';

import {
  AuthService
} from 'aurelia-auth';

@inject(Router, AuthService)
export class NavBar {
  constructor(router, auth) {
    this.authenticated = false;
    this.router = router;
    this.auth = auth;
    this.loginError = '';
    this.email = "";
    this.password = "";
  }

  attached() {
    $('.navbar-nav a').on('click', function () {
      $('.navbar-nav').find('li.active').removeClass('active');
      $(this).parent('li').addClass('active');
    });
  }

  login() {
    return this.auth.login(this.email, this.password)
      .then(response => {
        this.studentObj = response.user;
        sessionStorage.setItem('studentObj', JSON.stringify(this.studentObj));
        this.loginError = "";
        this.authenticated = this.auth.isAuthenticated();
        this.router.navigate('home');
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

  logout() {
    this.auth.logout();
    sessionStorage.removeItem('studentObj');
    this.authenticated = this.auth.isAuthenticated();

    // location.href = '/#home'
  }
}
