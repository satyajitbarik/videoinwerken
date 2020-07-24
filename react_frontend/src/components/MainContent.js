/* eslint-disable no-console */
import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
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
import NoMatch from "./NoMatch";
import Course from "./Manager/Courses/Course";
import CourseCreate from "./Manager/Courses/CourseCreate";
import ReduxTest from "./Manager/Courses/ReduxTest";
import EmployeeList from "./Manager/Employees/EmployeeList";
import EmployerList from "./Pages/Employers/EmployerList";
import EmployeeCourses from "./Employee/EmployeeCourses";
import EmployerAccount from "./Pages/Account/EmployerAccount";
import EmployeeAccount from "./Pages/Account/EmployeeAccount";
import { getUser } from "../actions/authActions";

function MainContent() {
  const [user, setUser] = React.useState(null);

  // Get logged in user
  useEffect(() => {
    if (user == null) {
      console.log("retrieving user");
      getUser(setUser);
    }
  });
  return (
    <div className="container" style={{ marginTop: 20 }}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
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

        <Route
          path="/employer_account"
          component={RequireAuth(EmployerAccount)}
        />
        <Route
          path="/employee_account"
          component={RequireAuth(EmployeeAccount)}
        />

        <Route path="/admin/employers" component={RequireAuth(EmployerList)} />

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

        {/*<Route path="/testredux" component={ReduxTest} />*/}
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default MainContent;
