import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { craftItem, strike, moneyChange, nextRound } from 'actions';
import { getElementCenter, appendToBody, createElementFromHTMLString, removeThis, getComponentNode, triggerClassAnimation } from 'utils/dom';
import { nonNegative } from 'utils/helpers';


import EnemyNumber from 'components/EnemyNumber.jsx';
import EnemyLife from 'components/EnemyLife.jsx';

 
import 'styles/Enemy.scss';

const castleImage = require('images/castle.svg');

class Enemy extends Component {
	render() {
		const {
			life: enemyLife,
			maxLife: enemyMaxLife,
			isDead,
			strike,
			round
		} = this.props;

		const hitTheEnemy = () => strike();
		const lifeProportion = enemyLife / enemyMaxLife;

		return (
			<button
				className="enemy"
				onClick={ hitTheEnemy }
			>
				<img src={ castleImage } className="enemy__image" />
				<div style={{ visibility: isDead ? 'hidden' : 'visible' }}>
					<EnemyNumber number={round} />
					<EnemyLife lifeProportion={lifeProportion} />
				</div>
			</button>
		)
	}


	componentWillReceiveProps(nextProps) {
		const damaged = (this.props.round === nextProps.round) && nonNegative(this.props.life - nextProps.life);
		if (damaged) {
			this.emitDamageCounter(damaged);
		}

		if (nextProps.isDead) {
			this.animateMovingForward();
		}
	}

	emitDamageCounter(damage) {
		const position = getElementCenter(
			getComponentNode(this)
		);
		const counterSize = 100;
		const counterEnlargeFontSize = Math.sqrt(damage) * 2;
		const counter = createElementFromHTMLString(`
			<div
				class="enemy__damage-counter"
				style="
					width: ${counterSize}px;
					top: ${position.top}px;
					left: ${position.left - counterSize / 2}px;
					--enlarge-font-size: ${counterEnlargeFontSize}px;
				"
			>
				${damage}
			</div>
		`);
		counter.addEventListener('animationend', removeThis);
		appendToBody(counter);
	}

	animateMovingForward() {
		triggerClassAnimation(
			getComponentNode(this),
			'enemy--next'
		)
		.then(this.props.nextRound)
	}
}

function mapStateToProps({ enemy: { life, maxLife, isDead }, round }) {
	return { life, maxLife, round, isDead }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ craftItem, strike, moneyChange, nextRound }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Enemy);