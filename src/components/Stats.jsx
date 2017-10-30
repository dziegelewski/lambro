import React, { Component } from 'react';
import { connect } from 'react-redux'

require('styles/Stats.scss');

import { shield, melee } from '../consts';
import Lifebar from './Lifebar.jsx';


class Stats extends Component {
	render() {
		const { life, maxLife, isDead } = this.props;
		const percentageLife = life/maxLife;

		return(
			<div className="stats">
				<h2>Lambro's stats</h2>
				<p>Attack: {this.getUsedItem(melee).stat}</p>
				<p>Defense: {this.getUsedItem(shield).stat}</p>

				<Lifebar percentageLife={percentageLife} isDead={isDead} />
				<h1>{ life }</h1>

			</div>
		)
	}

	getUsedItem(itemType) {
		return this.props.inventory.find(({ isUsed, type }) => isUsed === true && type === itemType ) || { stat: 0 }
	}

}

function mapStateToProps({ hero:  { life, maxLife, isDead }, inventory }) {
	return {
		life,
		maxLife,
		inventory,
		isDead
	}
}

export default connect(mapStateToProps)(Stats);