import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import gameManager from 'utils/gameManager';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'reducers';
import App from 'components/App';
import { wait } from 'utils/helpers';

const store = createStore(reducers);

const container = document.getElementById('app');

wait(1500)
.then(() => {

	ReactDOM.render(
		<Provider store={store}>
			<App/>
		</Provider>,
		container
	);

	gameManager(store);
})