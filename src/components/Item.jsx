import React, { Component } from "react";

import range from "lodash/range";

require("styles/Item.scss");

let icons = {
	melee: range(0, 6).map(index => require(`../images/melee${index}.svg`)),
	shield: range(0, 3).map(index => require(`../images/shield${index}.svg`)),
	potion: [0].map(index => require(`../images/potion${index}.svg`))
};

class Item extends Component {
	render() {
		const { params, isEnabled, onClick, onContextMenu } = this.props;

		const { type, rank, stat = 0, isUsed = false } = params;

		const figureClass = `item item--${type} ${isUsed ? "item--used" : ""} ${isEnabled ? "" : "item--disabled"}`;
		const captionClass = `item__caption item__caption--${type}`;
		const pictureSrc = icons[type][rank];

		return (
			<figure
				className={figureClass}
				onClick={onClick}
				onContextMenu={onContextMenu}
			>
				<img className="item__image" src={pictureSrc} alt="Item" />

				<figcaption className={captionClass}>{stat}</figcaption>
			</figure>
		);
	}
}

export default Item;
