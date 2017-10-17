import React, { Component } from 'react';
import { connect } from 'react-redux'

require('styles/Stats.scss');

import { shield, melee } from '../consts';
import Lifebar from './Lifebar.jsx';


class Stats extends Component {
	render() {
		const { life, isDead } = this.props;
		return(
			<div className="stats">
				<h2>Lambro's stats</h2>
				<p>Attack: {this.getUsedItem(melee).stat}</p>
				<p>Defense: {this.getUsedItem(shield).stat}</p>

				<Lifebar life={life} isDead={isDead} />
				<h1>{life}</h1>

			</div>
		)
	}

	getUsedItem(itemType) {
		return this.props.inventory.find(({ isUsed, type }) => isUsed === true && type === itemType ) || { stat: 0 }
	}

}

function mapStateToProps({game: {life, isDead, inventory}}) {
	return {
		life,
		inventory,
		isDead
	}
}

export default connect(mapStateToProps)(Stats);