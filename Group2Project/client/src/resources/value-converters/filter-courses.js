export class FilterCoursesValueConverter {
  toView(courses, filterCourses) {
    if (!courses) return;
    if (filterCourses) return courses;

    let filteredCourses = [];
    courses.forEach(course => {
      if (course.status !== 'Completed') filteredCourses.push(course);
    });
    return filteredCourses;
  }
}
