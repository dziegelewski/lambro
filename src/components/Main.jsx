import React from 'react';

require('normalize.css/normalize.css');

import Panel from './Panel.jsx';
import Enemy from './Enemy.jsx';
import Tavern from './Tavern.jsx';
import Inventory from './Inventory.jsx';
import Stats from './Stats.jsx';
import Copyright from './Copyright.jsx';
import Regeneration from './Regeneration.jsx';

class AppComponent extends React.Component {
  render() {
    return (
    	<div>

        <Panel />
        <Enemy />
        <Tavern />
        <Stats />
        <Inventory />
        <Copyright />

        <Regeneration />
        
	    </div>
    );
  }
}

export default AppComponent;
