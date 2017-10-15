import React, { Component } from 'react';
import { connect } from 'react-redux'

require('styles/Stats.scss');

import { shield, melee } from '../consts';
import Lifebar from './Lifebar.jsx';


class Stats extends Component {
	render() {
		const { life } = this.props;
		return(
			<div className="stats">
				<h2>Lambro's stats</h2>
				<p>Attack: {this.getUsedItem(melee).stat}</p>
				<p>Defense: {this.getUsedItem(shield).stat}</p>

				<Lifebar life={life} />

			</div>
		)
	}

	getUsedItem(itemType) {
		return this.props.inventory.find(({ isUsed, type }) => isUsed === true && type === itemType ) || { stat: 0 }
	}

}

function mapStateToProps({life, inventory}) {
	return {
		life,
		inventory
	}
}

export default connect(mapStateToProps)(Stats);