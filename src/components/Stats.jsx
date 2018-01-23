import React, { Component } from 'react';
import { connect } from 'react-redux'

require('styles/Stats.scss');

import Lifebar from 'components/Lifebar.jsx';


class Stats extends Component {
	render() {
		const { attack, defense, life, maxLife, isDead, round } = this.props;
		const percentageLife = life/maxLife;

		return(
			<div className="stats">
				<div className="stats__numbers">
					<span className="stats__stat">Fort: { round }</span>
					<span className="stats__stat">Total attack: { attack }</span>
					<span className="stats__stat">Total defense: { defense }</span>
				</div>

				<Lifebar percentageLife={percentageLife} isDead={isDead} />

			</div>
		)
	}

}

function mapStateToProps({ attack, defense, hero:  { life, maxLife, isDead }, inventory, round }) {
	return {
		attack,
		defense,
		life,
		maxLife,
		inventory,
		isDead,
		round
	}
}

export default connect(mapStateToProps)(Stats);