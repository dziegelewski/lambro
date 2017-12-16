import React, { Component } from 'react';
import { connect } from 'react-redux'

require('styles/Stats.scss');

import { shield, melee } from '../consts';
import Lifebar from './Lifebar.jsx';


class Stats extends Component {
	render() {
		const { attack, defense, life, maxLife, isDead } = this.props;
		const percentageLife = life/maxLife;

		return(
			<div className="stats">
				<h2>Lambro's stats</h2>
				<p>Attack: { attack }</p>
				<p>Defense: { defense }</p>

				<Lifebar percentageLife={percentageLife} isDead={isDead} />
				<h1>{ life }</h1>

			</div>
		)
	}

}

function mapStateToProps({ attack, defense, hero:  { life, maxLife, isDead }, inventory }) {
	return {
		attack,
		defense,
		life,
		maxLife,
		inventory,
		isDead
	}
}

export default connect(mapStateToProps)(Stats);