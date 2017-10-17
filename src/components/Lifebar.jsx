import React from 'react';
require('styles/Lifebar.scss');

export default function({life, isDead}) {
	const positiveLife = life > 0 ? life : 0;
	return (
		<div className="lifebar">
			<div className={`lifebar__liquid ${isDead ? 'lifebar__liquid--deadman' : ''}`} style={{height: positiveLife  + '%'}} />
		</div>
	)
}