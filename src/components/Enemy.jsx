import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { craftItem, strike, moneyChange } from '../actions';
 
require('styles/Enemy.scss');

let castleImage = require('../images/castle.svg');
import Bricks from './Bricks.jsx';

class Enemy extends Component {
	render() {

		const enemyLife = this.props.life;
		const enemyMaxLife = this.props.maxLife;
		const enemyLifeRatio = enemyLife / enemyMaxLife;

		const hitTheEnemy = () => {
			this.props.strike();
		}

		return (
			<button
				className="enemy"
				onClick={ hitTheEnemy }
			>
				<Bricks percentageLife={ enemyLifeRatio }>
					<img src={ castleImage } className="enemy__image" />
				</Bricks>
				<h1>{ enemyLife } / { enemyMaxLife }</h1>
			</button>
		)
	}
}

function mapStateToProps({ enemy: { life, maxLife } }) {
	return { life, maxLife }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({craftItem, strike, moneyChange}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Enemy);