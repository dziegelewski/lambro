import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import gameManager from 'utils/gameManager';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducers from 'reducers';
import App from 'components/App';
import { wait } from 'utils/helpers';
import persistState from 'redux-localstorage';

const store = createStore(reducers, compose(
	persistState()
));
const container = document.getElementById('app');

wait(1000)
.then(() => {

	ReactDOM.render(
		<Provider store={store}>
			<App/>
		</Provider>,
		container
	);

	gameManager(store);
})