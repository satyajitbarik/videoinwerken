//const ROOT_URL = "http://localhost:8000/";

//const ROOT_URL = "http://h2900735.stratoserver.net:8000/";
const ROOT_URL = "http://0.0.0.0:8000/";

export const AuthUrls = {
  LOGIN: `${ROOT_URL}rest-auth/login/`,
  SIGNUP: `${ROOT_URL}rest-auth/registration/`,
  CHANGE_PASSWORD: `${ROOT_URL}rest-auth/password/change/`,
  RESET_PASSWORD: `${ROOT_URL}rest-auth/password/reset/`,
  RESET_PASSWORD_CONFIRM: `${ROOT_URL}rest-auth/password/reset/confirm/`,
  USER_ACTIVATION: `${ROOT_URL}rest-auth/registration/verify-email/`,
  USER_PROFILE: `${ROOT_URL}rest-auth/user/`,

  COURSES: `${ROOT_URL}api/manager/courses/`,

  API_USER: `${ROOT_URL}api/getuser/`,
  API_EMPLOYERS: `${ROOT_URL}api/employers/`,

  API_EMPLOYEE_COURSES: `${ROOT_URL}api/employee/courses/`,
  API_EMPLOYEE_EMPLOYEEQUESTIONSCOURSE: `${ROOT_URL}api/employee/employeequestionscourse/`,
  API_EMPLOYEE_COURSEQUESTIONS: `${ROOT_URL}api/employee/coursequestions/`,
  API_EMPLOYEE_EMPLOYEEQUESTION: `${ROOT_URL}api/employee/employeequestion/`,

  API_MANAGER_COURSES: `${ROOT_URL}api/manager/courses/`,
  API_MANAGER_COURSE_QUESTIONS: `${ROOT_URL}api/manager/course/questions/`,
  API_MANAGER_COURSE_QUESTION_ANSWERS: `${ROOT_URL}api/manager/course/question/answers/`,
};
