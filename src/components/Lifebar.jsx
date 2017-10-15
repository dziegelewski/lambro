import React from 'react';
require('styles/Lifebar.scss');

export default function({life}) {
	const positiveLife = life > 0 ? life : 0;
	return (
		<div className="lifebar">
			<div className="lifebar__liquid" style={{height: positiveLife  + '%'}} />
		</div>
	)
}