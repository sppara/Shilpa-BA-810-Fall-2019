import {
  AuthorizeStep
} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep);
    config.title = 'Things Course';
    config.map([{
        route: ['', 'home'],
        name: 'home',
        moduleId: 'modules/home',
        title: 'Home',
        auth: false
      },
      {
        route: 'students',
        name: 'students',
        moduleId: 'modules/students',
        title: 'Students'
      },
      {
        route: 'courses',
        name: 'courses',
        moduleId: 'modules/courses',
        title: 'Courses',
        auth: true
      },
      {
        route: 'grades',
        name: 'grades',
        moduleId: 'modules/grades',
        title: 'Grades',
        auth: true
      }
    ]);
  }
}
