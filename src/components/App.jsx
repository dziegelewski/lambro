import React from "react";

require("normalize.css/normalize.css");
require("styles/App.scss");

import Panel from "components/Panel.jsx";
import Enemy from "components/Enemy.jsx";
import Tavern from "components/Tavern.jsx";
import Inventory from "components/Inventory.jsx";
import Stats from "components/Stats.jsx";
import Copyright from "components/Copyright.jsx";

class App extends React.Component {
  render() {
    return (
      <div className="app">
      
        <Panel />
      
        <Enemy />
        <Stats />

        <Tavern />
        <Inventory />
        <Copyright />

      </div>
    );
  }
}

export default App;
