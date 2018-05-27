import React from "react";
import Coin from "components/Coin.jsx";
import { onOffClass } from 'utils/helpers';


require("styles/Mercenary.scss");

export default function Mercenary(props) {
	const { number, isOn, onClick, stats } = props;
	const { id, name, /*attack,*/ cost } = stats;

	let portrait = require(`../images/mercenary${id}.svg`);
	const className = 'mercenary ' + onOffClass('mercenary', isOn);
 
	return (

		<button className={className} onClick={onClick}>
			<img src={portrait} className="mercenary__portrait" alt={name} />
			<div> {number}</div>
			<div>	<Coin>{cost}</Coin></div>
		</button>

	);
}
