import {
  inject
} from 'aurelia-framework';
import {
  Router
} from 'aurelia-router';
import {
  User
} from '../resources/data/user-object';

@inject(Router, User)
export class Users {
  constructor(router, users) {
    this.router = router;
    this.users = users;
    this.message = 'Register an Account';
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

  logout() {
    this.router.navigate('home');
  }
}
