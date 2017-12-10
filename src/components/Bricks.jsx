import React from 'react';
import times from 'lodash/times';

function Bricks({ percentageLife, children }) {
	const numberOfRows = 4;
	const bricksPerRow = 8;
	const totalBricks = numberOfRows * bricksPerRow;
	const bricksToRender = Math.floor(totalBricks * percentageLife);

	let renderedBricks = 0;

	return (
		<div className="enemy__bricks">
			{ times(numberOfRows, renderBricksRow) }
			{ children}
		</div>
	)

	function renderBricksRow(index) {
		return (
			<div className="enemy__bricks-row" key={index}>
				{times(bricksPerRow, renderOneBrick)}
			</div>
		)
	}

	function renderOneBrick(index) {
		const isBrickDestroyed = renderedBricks > bricksToRender;
		renderedBricks ++;
		return <div className={`enemy__brick ${isBrickDestroyed ? 'enemy__brick--destroyed' : ''}`} key={index}/>
	}

}

export default Bricks;