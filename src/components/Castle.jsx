import React from 'react';
import times from 'lodash/times';
require('styles/Castle.scss');

let image = require('../images/castle.svg');

export default function Castle({ percentVitality }) {
	const BRICKS_PER_ROW = 8;

	function makeBricks(structure, quarter) {
		return (
			<div className={`castle__bricks castle__bricks--${structure}`}>
				{ for (let i=0; i<BRICKS_PER_ROW; i++) {
					const isDestroyed = percentVitality < (quarter * 25)
					return <div	className={`castle__brick ${isDestroyed ? 'castle__brick--destroyed' : ''}`} />) }
				}}
			</div>
		)
	}

	return (
		<div className="castle">
				{ makeBricks('row', 0) }
				{ makeBricks('column', 3) }
				<img src={image} className="castle__image" />
				{ makeBricks('column', 1) }
				{ makeBricks('row', 2) }
		</div>
	)
}

