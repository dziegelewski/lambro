import React from 'react';
import times from 'lodash/times';
const imgSrc = require(`images/shield2.svg`);


export default function(props) {
	const { lifeProportion } = props;
	const ITEMS_NUMBER = 3;
	const displayedItems = Math.ceil(lifeProportion / (1 / ITEMS_NUMBER));

	return (
		<div className="enemy-life">
			{times(displayedItems, (index) => (
				<img
				className="enemy-life__item"
				key={index}
				src={imgSrc}

				/>
			))}
		</div>
	);
}
