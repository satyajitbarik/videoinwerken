import React, { useState } from "react";
import { Notifs } from "redux-notifications";
import Header from "./Header";
import MainContent from "./MainContent";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
