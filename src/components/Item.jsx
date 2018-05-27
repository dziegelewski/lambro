import React, { Component } from "react";
import { onOffClass } from 'utils/helpers';

require("styles/Item.scss");

const emptyFn = function() {};

class Item extends Component {
	render() {
		const {
			isOn,
			onClick = emptyFn,
			onContextMenu = emptyFn,
			params: {
				type = 'empty',
				rank,
				stat = 0,
				isUsed = false
			} = {},
			isEmpty = false
		} = this.props;

		const figureClass = `item item--${type} ` + (isUsed ? "item--used" : "") + onOffClass(' item', isOn);
		const captionClass = `item__caption item__caption--${type}`;
		const pictureSrc = isEmpty ? require(`images/shield2.svg`) :  require(`images/${type}${rank}.svg`);


		return (
			<figure
				className={figureClass}
				onClick={onClick}
				onContextMenu={onContextMenu}
			>
				<img className="item__image" src={pictureSrc} alt="Item" />

				<figcaption className={captionClass}>
					{stat}
				</figcaption>
			</figure>
		);
	}
}

export default Item;
