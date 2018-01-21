import React from "react";
import Coin from "components/Coin.jsx";


require("styles/Mercenary.scss");

export default function Mercenary(props) {
	const { number, isAffordable, onClick, stats } = props;
	const { id, name, attack, cost } = stats;

	let portrait = require(`../images/mercenary${id}.svg`);
	const affordabilityClass = isAffordable ? '' : 'mercenary--disabled';
 
	return (

		<button className={"mercenary " + affordabilityClass} onClick={onClick}>
			<img src={portrait} className="mercenary__portrait" alt={name} />
			<div> {number} | {attack}</div>
			<div>	<Coin>{cost}</Coin></div>
		</button>

	);
}
