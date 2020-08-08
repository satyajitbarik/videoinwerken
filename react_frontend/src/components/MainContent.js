/* eslint-disable no-console */
import React from "react";
//mport { Router, Route } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Landing from "./Landing";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Signup from "./auth/Signup";
import SignupDone from "./auth/SignupDone";
import AccountActivation from "./auth/AccountActivation";
import UserProfile from "./auth/UserProfile";
import UserProfileEdit from "./auth/UserProfileEdit";
import PasswordChange from "./auth/PasswordChange";
import PasswordReset from "./auth/PasswordReset";
import PasswordResetDone from "./auth/PasswordResetDone";
import PasswordResetConfirm from "./auth/PasswordResetConfirm";
//import NoMatch from "./NoMatch";
import Course from "./Manager/Courses/Course";
import CourseCreate from "./Manager/Courses/CourseCreate";
import EmployeeList from "./Manager/Employees/EmployeeList";
import EmployerList from "./Pages/Employers/EmployerList";
import EmployeeCourses from "./Employee/EmployeeCourses";
import Account from "./Pages/Account/Account";
import Youtube from "../components/Pages/Youtube/Youtube";
import Youtube1 from "../components/Pages/Youtube/Youtube1";
import Success from "../components/Pages/Youtube/Success";
import VideoUpload from "../components/Pages/Youtube/VideoUpload";
import ApiVideo from "../components/Pages/Youtube/ApiVideo";

function MainContent() {
  return (
    // Changed Switch to Router. Router does not support nested routes.
    <div className="container" style={{ marginTop: 20 }}>
      <BrowserRouter basename={"/videoinwerken"}>
        <Route exact path="/" component={Landing} />

        <Route path="/login" component={Login} />

        {/* <Route path="/videoinwerken/dist/login" component={Login} />*/}
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/account/confirm-email/:key"
          component={AccountActivation}
        />
        <Route path="/signup_done" component={SignupDone} />
        <Route path="/reset_password" component={PasswordReset} />
        <Route path="/reset_password_done" component={PasswordResetDone} />
        <Route path="/reset/:uid/:token/" component={PasswordResetConfirm} />
        <Route path="/profile" component={RequireAuth(UserProfile)} />
        <Route path="/profile_edit" component={RequireAuth(UserProfileEdit)} />
        <Route
          path="/change_password"
          component={RequireAuth(PasswordChange)}
        />

        <Route path="/admin/employers" component={RequireAuth(EmployerList)} />

        <Route path="/account" component={RequireAuth(Account)} />
        <Route
          path="/manager/employees"
          component={RequireAuth(EmployeeList)}
        />

        <Route path="/manager/courses" component={RequireAuth(Course)} />

        <Route
          path="/manager/createcourse"
          component={RequireAuth(CourseCreate)}
        />

        <Route
          path="/employee/courses"
          component={RequireAuth(EmployeeCourses)}
        />

        <Route path="/youtube" component={Youtube} />

        <Route path="/success" component={Success} />

        <Route path="/youtube1" component={Youtube1} />
        <Route path="/videoupload" component={VideoUpload} />
        <Route path="/apivideo" component={ApiVideo} />

        {/*<Route path="/testredux" component={ReduxTest} />*/}
        {/* <Route component={NoMatch} /> */}
      </BrowserRouter>
    </div>
  );
}

export default MainContent;
