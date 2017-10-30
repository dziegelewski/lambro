import React from 'react';
require('styles/Lifebar.scss');

export default function({percentageLife, isDead}) {
	return (
		<div className="lifebar">
			<div
				className={`lifebar__liquid ${isDead ? 'lifebar__liquid--deadman' : ''}`}
				style={{height: (percentageLife * 100)  + '%'}} />
		</div>
	)
}