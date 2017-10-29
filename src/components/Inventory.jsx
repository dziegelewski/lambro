import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { heal, removeItem, putItem, putItemOff, moneyChange } from '../actions';

require('styles/Inventory.scss');

import Item from './Item.jsx';
import { MAX_PACK, potion } from '../consts';

class Inventory extends Component {
	render() {

		if (!this.props.inventory) {
			return <div/>
		}

		return (
		<div className="inventory">
			<h2>Lambro's inventory</h2>
			<p>Filled space: { this.props.inventory.length } / { MAX_PACK }</p>
			<div className="inventory__items">
					{ this.mapItems() }
			</div>
		</div>
		)
	}

	mapItems() {
		const { inventory } = this.props;
		return (
			inventory.map(item => {
			  return (
			  	<Item
				  	params={item} key={item.id}
					  use={this.useItem.bind(this)}
					  sell={this.sellItem.bind(this)}
			  	/>
		  	)
			})
		)
	}

	useItem(item) {
		if (item.type === potion) {
			this.props.heal(item.stat);
			this.props.removeItem(item.id);
		}

		if (item.isWearable) {
			if (!item.isUsed) {
				this.props.putItem(item);
			} else {
				this.props.putItemOff(item)
			}
		}
	}

	sellItem(item, e) {
		e.preventDefault();
		this.props.removeItem(item.id);

		if (item.isWearable) {
			this.props.moneyChange(item.stat)
		}
	}
}

function mapStateToProps({ inventory }) {
	return {inventory}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({heal, removeItem, putItem, putItemOff, moneyChange}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);