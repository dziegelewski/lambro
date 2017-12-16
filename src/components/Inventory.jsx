import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useItem, sellItem } from '../actions';

require('styles/Inventory.scss');

import Item from './Item.jsx';
import { MAX_PACK } from '../consts';

class Inventory extends Component {
	render() {

		if (!this.props.inventory) {
			return <div/>
		}

		const spaceFilled = this.props.inventory.length;
		const spaceLeft = MAX_PACK;
		const listOfItems = this.mapItems();

	return (
		<div className="inventory">
			<h2>Lambro's inventory</h2>
			<p>Filled space: { spaceFilled } / { spaceLeft }</p>
			<div className="inventory__items">
					{ listOfItems }
			</div>
		</div>
		)
	}

	mapItems() {
		const { inventory } = this.props;

		return (
			inventory.map(item => {

				const useItem = () => {
					this.props.useItem(item);
				}

				const sellItem = (e) => {
					e.preventDefault();
					this.props.sellItem(item)
				}

			  return (
			  	<Item
				  	params={ item }
				  	key={ item.id }
				  	useItem={ useItem }
				  	sellItem={ sellItem }
			  	/>
		  	)
			})
		)
	}
	
}

function mapStateToProps({ inventory }) {
	return { inventory }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ useItem, sellItem }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);