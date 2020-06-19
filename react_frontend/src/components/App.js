import React, { useEffect, useState } from "react";
import { Notifs } from "redux-notifications";

import Header from "./Header";
import MainContent from "./MainContent";

/*export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Notifs />
        <Header />
        <MainContent />
      </div>
    );
  }
}*/

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div className="container">
      <Notifs />
      <Header
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <MainContent />
    </div>
  );
}
