import React from 'react';
import times from 'lodash/times';

export default function(props) {
	const { number } = props;

	return <div className="enemy-number">{number}</div>;

	// return (
	// 	<div className="enemy-number">
	// 		{times(number, (index) => <div key={index} /> )}
	// 	</div>
	// )
}
