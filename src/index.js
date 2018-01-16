import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import gameManager from './gameManager';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
const store = createStore(reducers);

import App from './components/App';
const container = document.getElementById('app');

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	container
);

gameManager(store);