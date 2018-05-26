import React from 'react';
import times from 'lodash/times';

export default function(props) {
	const { lifeProportion } = props;
	const ITEMS_NUMBER = 5;
	const displayedItems = Math.ceil(lifeProportion / (1 / ITEMS_NUMBER));

	return (
		<div className="enemy-life">
			{times(displayedItems, (index) => <div key={index} /> )}
		</div>
	);
}
