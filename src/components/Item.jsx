import React, { Component } from 'react';

import range from 'lodash/range'
require('styles/Item.scss');
let icons = {
	melee: range(0,6).map(index => require(`../images/melee${index}.svg` )),
	shield: range(0,3).map(index => require(`../images/shield${index}.svg` )),
	potion: [0].map(index => require(`../images/potion${index}.svg` ))
}
 
class Item extends Component {
	render() {
		const { params, params: { type, rank, stat = 0, isUsed = false }, use, sell } = this.props;
		return (
			<figure
				className={`item item--${type} ${isUsed ? 'item--used' : ''}`}
				onClick={() => use(params)}
				onContextMenu={(e) => sell(params, e)}
			>

				<img className="item__image" src={icons[type][rank]} alt="Item" />

				<figcaption className={`item__caption item__caption--${type}`}>
					{ stat }
				</figcaption>

			</figure>

		)
	}

}

export default Item;