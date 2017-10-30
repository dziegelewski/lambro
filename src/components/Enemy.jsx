import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { craftItem, strike, moneyChange } from '../actions';
 
require('styles/Enemy.scss');

let castleImage = require('../images/castle.svg');
import Bricks from './Bricks.jsx';

class Enemy extends Component {
	render() {
		const { life, maxLife } = this.props;
		const percentageLife = life/maxLife;

		return (
			<button className="enemy" onClick={this.strike.bind(this)}>
				<Bricks percentageLife={percentageLife}>
					<img src={castleImage} className="enemy__image" />
				</Bricks>
				<h1>{this.props.life} / {this.props.maxLife}</h1>
			</button>
		)
	}

	strike() {
		this.props.strike()
	}
}

function mapStateToProps({ enemy: { life, maxLife } }) {
	return { life, maxLife }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({craftItem, strike, moneyChange}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Enemy);