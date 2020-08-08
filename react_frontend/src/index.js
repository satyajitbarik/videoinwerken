import "bootstrap/dist/css/bootstrap.css";
import "redux-notifications/lib/styles.css";
import "./styles/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import history from "./utils/historyUtils";
import { authLogin } from "./actions/authActions";
import App from "./components/App";

//Material UI
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const token = localStorage.getItem("token");

if (token) {
  store.dispatch(authLogin(token));
}

ReactDOM.render(
  <MuiThemeProvider theme={getMuiTheme()}>
    <Provider store={store}>
      <Router basename={"/videoinwerken"} history={history}>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
