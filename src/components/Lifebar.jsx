import React from 'react';
require('styles/Lifebar.scss');

export default function({percentageLife, isDead}) {

	const deadClass = isDead ? 'lifebar__liquid--ghost' : '';
	const liquidAmount = (percentageLife * 100)  + '%';

	return (
		<div className="lifebar">
			<div className={`lifebar__liquid lifebar__liquid--horizontal ${deadClass}`}	style={{width: liquidAmount }}	/>
			<div className={`lifebar__liquid lifebar__liquid--vertical ${deadClass}`}	style={{height: liquidAmount }}	/>
		</div>
	)
}