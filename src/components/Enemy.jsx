import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { craftItem, strike, moneyChange } from '../actions';

import random from 'lodash/random';
require('styles/Enemy.scss');

let castleImage = require('../images/castle.svg');
import Bricks from './Bricks.jsx';

class Enemy extends Component {
	render() {
		let percentageLife = this.props.enemyCurrentHealth/this.props.enemyMaxHealth;
		return (
			<button className="enemy" onClick={this.strike.bind(this)}>
				<Bricks percentageLife={percentageLife}>
					<img src={castleImage} className="enemy__image" />
				</Bricks>
			</button>
		)
	}

	strike() {
		if (random(0,3) === 0) {
			this.props.craftItem()
		}
		this.props.strike(random(1,9))
	}
}

function mapStateToProps({ game }) {
	const { enemyCurrentHealth, enemyMaxHealth } = game;
	return {enemyCurrentHealth, enemyMaxHealth}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({craftItem, strike, moneyChange}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Enemy);