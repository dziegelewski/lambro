import React from 'react';

require('styles/Mercenary.scss');

export default function Mercenary(props) {
	const { stats: { id, name, attack, price }, number, hire } = props;
	let image = require(`../images/mercenary${id}.svg`)

	return (
		<button className="mercenary" onClick={() => hire(id, price)}>
			<h3>{ attack }</h3>
			<p>{ number } ({ price }$)</p>
				<img src={image} className="mercenary__portrait" alt={name} />
		</button>
	)
}