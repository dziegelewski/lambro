import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useItem, sellItem } from 'actions';
import times from 'lodash/times';

require('styles/Inventory.scss');

import Item from 'components/Item.jsx';
import { potion } from 'consts';

class Inventory extends Component {
	render() {

		if (!this.props.inventory) {
			return <div/>
		}

		const maxSpace = this.props.maxPack;
		const filledSpace = this.props.inventory.length;
		const freeSpace = maxSpace - filledSpace;

		const isInventoryFull = filledSpace === maxSpace;

		const filledSpaceClassName = 'inventory__space-filled ' + (isInventoryFull ? 'inventory__space-filled--full' : '');
		const listOfItems = this.mapItems();
		const listOfFreeSpaces = this.mapFreeSpaces(freeSpace);

	return (
		<div className="inventory">
			<h2>Lambro's inventory</h2>
			<p className={filledSpaceClassName}>Filled space: { filledSpace } / { maxSpace }</p>
			<div className="inventory__items">
					{ listOfItems }
					{ listOfFreeSpaces }
					<div className="item item--flex" />
					<div className="item item--flex" />
					<div className="item item--flex" />
			</div>
		</div>
		)
	}

	mapItems() {
		const { inventory } = this.props;

		return (
			inventory.map(item => {


				const isOn = this.isItemOn(item);
				const useItem = () => this.props.useItem(item);
				const sellItem = (e) => {
					e.preventDefault();
					this.props.sellItem(item)
				};

			  return (
			  	<Item
				  	params={ item }
				  	isOn={ isOn }
				  	key={ item.id }
				  	onClick={ useItem }
				  	onContextMenu={ sellItem }
			  	/>
		  	)
			})
		)
	}

	mapFreeSpaces(freeSpace) {
		return times(freeSpace, (index) => <Item key={index} isEmpty /> );
	}

	isItemOn(item) {
		const { potionsEnabled, isHeroDead } = this.props;

		if (item.type !== potion) {
			return true;
		}

		if (item.type === potion) {

			if (item.effect === 'heal') {
				return potionsEnabled;
			}

			if (item.effect === 'resurrect')  {
				return isHeroDead;
			}

		}
	}
}

function mapStateToProps({ inventory, potionsEnabled, isHeroDead, maxPack  }) {
	return { inventory, potionsEnabled, isHeroDead, maxPack }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ useItem, sellItem }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);