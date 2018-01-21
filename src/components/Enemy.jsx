import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { craftItem, strike, moneyChange } from 'actions';
// import Bricks from './Bricks.jsx';
 
import 'styles/Enemy.scss';

const castleImage = require('images/castle.svg');

class Enemy extends Component {
	render() {

		const enemyLife = this.props.life;
		const enemyMaxLife = this.props.maxLife;
		// const enemyLifeRatio = enemyLife / enemyMaxLife;

		const hitTheEnemy = () => this.props.strike();

		return (
			<button
				className="enemy"
				onClick={ hitTheEnemy }
			>
					<img src={ castleImage } className="enemy__image" />
				{/* <Bricks percentageLife={ enemyLifeRatio }>				</Bricks> */}



				<h1>{ enemyLife } / { enemyMaxLife }</h1>
			</button>
		)
	}

	// componentWillReceiveProps(nextProps) {
	// 	this.damaged = this.props.life - nextProps.life;
	// 	this.damageCounter.classList.remove('enemy__damaged');
	// 	this.damageCounter.classList.add('enemy__damaged');
	// }
}

function mapStateToProps({ enemy: { life, maxLife } }) {
	return { life, maxLife }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({craftItem, strike, moneyChange}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Enemy);