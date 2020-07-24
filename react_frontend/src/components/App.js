import React, { useState, useEffect } from "react";
import { Notifs } from "redux-notifications";
import Header from "./Header";
import MainContent from "./MainContent";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { AuthUrls } from "../constants/urls";
import { getUserToken } from "../utils/authUtils";
import { getUser } from "../actions/authActions";

// If you want to use this, add <Typography> in code
const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      //fontStyle: "italic",
    },
  },
});

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const [userProfile, setUserProfile] = React.useState(null);

  // Runs on initial render
  useEffect(() => {
    if (userProfile == null) {
      console.log("retrieve user");
      getUser(setUserProfile);
    }
    console.log(userProfile);
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Notifs />
        <Header
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <MainContent />
      </ThemeProvider>
    </div>
  );
}
