// import 'core-js/fn/object/assign';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducers from './reducers'
// import App from './components/Main';

// let store = createStore(reducers)

// ReactDOM.render(
// 	<Provider store={store}>
// 	<App />
// 	</Provider>,
// 	document.getElementById('app'));


var timer = function() {
	var count = 0;

	return function() {
		return count++;
	}
}()