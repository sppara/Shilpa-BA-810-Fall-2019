export class FilterCoursesCompletedValueConverter {
  toView(courses) {
    if (!courses) return;
    let filteredCourses = [];
    courses.forEach(course => {
      if (course.status == 'Completed') filteredCourses.push(course);
    });
    return filteredCourses;
  }
}
