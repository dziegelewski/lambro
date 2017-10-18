import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { craftItem, strike, moneyChange } from '../actions';

require('styles/Enemy.scss');

let castleImage = require('../images/castle.svg');
import Bricks from './Bricks.jsx';

class Enemy extends Component {
	render() {
		let percentageLife = this.props.enemyCurrentLife/this.props.enemyMaxLife;
		return (
			<button className="enemy" onClick={this.strike.bind(this)}>
				<Bricks percentageLife={percentageLife}>
					<img src={castleImage} className="enemy__image" />
				</Bricks>
				<h1>{this.props.enemyCurrentLife} / {this.props.enemyMaxLife}</h1>
			</button>
		)
	}

	strike() {
		this.props.strike()
	}
}

function mapStateToProps({ game }) {
	const { enemyCurrentLife, enemyMaxLife } = game;
	return {enemyCurrentLife, enemyMaxLife}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({craftItem, strike, moneyChange}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Enemy);