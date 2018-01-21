import React from 'react';

require("styles/Coin.scss");
const img = require('images/coins.svg');


export default function({ layout = 'default', children }) {
	return (
		<div className={`coin coin--${layout}`}>

			<span>{ children }</span>
			<img src={img} className="coin__img" />
		</div>
	)
}