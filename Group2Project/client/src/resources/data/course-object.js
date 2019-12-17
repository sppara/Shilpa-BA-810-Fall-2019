import {
  inject
} from 'aurelia-framework';
import {
  DataServices
} from './data-services';

@inject(DataServices)
export class Course {
  constructor(data) {
    this.data = data;
    this.COURSE_SERVICE = 'courses';
  }

  newCourse(id) {
    this.selectedCourse = {};
    this.selectedCourse.course = "";
    this.selectedCourse.grade = "";
    this.selectedCourse.detail = "";
    this.selectedCourse.dateDue = new Date();
    this.selectedCourse.status = "Todo";
    this.selectedCourse.studentId = id;
  }
  async saveCourse() {
    let serverResponse;
    if (this.selectedCourse) {
      if (this.selectedCourse._id) {
        let url = this.COURSE_SERVICE + "/" + this.selectedCourse._id;
        serverResponse = await this.data.put(this.selectedCourse, url);
      } else {
        serverResponse = await this.data.post(this.selectedCourse, this.COURSE_SERVICE);
      }
      return serverResponse;
    }
  }
  async getCourses(studentid) {
    let url = this.COURSE_SERVICE + '/student/' + studentid;
    let response = await this.data.get(url);
    if (!response.error) {
      this.coursesArray = response;
    } else {
      this.coursesArray = [];
    }
  }

  async deleteCourse(courseId) {
    console.log(courseId)
    let url = this.COURSE_SERVICE + '/' + courseId;
    let response = await this.data.delete(url);
    if (!response.error) {
      this.coursesArray = response;
    } else {
      this.coursesArray = [];
    }
  }

}
