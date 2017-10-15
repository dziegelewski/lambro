import React from 'react';
import times from 'lodash/times';

function Bricks({ percentageLife, children }) {
	const rows = 4;
	const bricksPerRow = 8;
	const totalBricks = rows * bricksPerRow;
	const bricksToDisplay = Math.floor(totalBricks * percentageLife);
	let displayedBricks = 0;

	return (
		<div className="enemy__bricks">
			{ times(rows, renderBricksRow) }
			{ children}
		</div>
	)

	function renderBricksRow(index) {
		return <div className="enemy__bricks-row" key={index}>{times(bricksPerRow, renderOneBrick)}</div>
	}

	function renderOneBrick(index) {
		const isDestroyed = displayedBricks > bricksToDisplay;
		displayedBricks ++;
		return <div className={`enemy__brick ${isDestroyed ? 'enemy__brick--destroyed' : ''}`} key={index}/>
	}

}

export default Bricks;