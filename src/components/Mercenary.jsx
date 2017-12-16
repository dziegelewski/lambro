import React from "react";

require("styles/Mercenary.scss");

export default function Mercenary(props) {
	const { number, hireMercenary, stats: { id, name, attack, cost } } = props;

	let portrait = require(`../images/mercenary${id}.svg`);

	return (
		<button className="mercenary" onClick={hireMercenary.bind(this)}>
			<h3>{attack}</h3>
			<p>
				{number} ({cost}$)
			</p>
			<img src={portrait} className="mercenary__portrait" alt={name} />
		</button>
	);
}
