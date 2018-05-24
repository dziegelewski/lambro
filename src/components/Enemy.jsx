import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { craftItem, strike, moneyChange } from 'actions';
import { getElementCenter, appendToBody, createElementFromHTMLString, removeThis } from 'utils/dom';
 
import 'styles/Enemy.scss';

const castleImage = require('images/castle.svg');

class Enemy extends Component {
	render() {

		const enemyLife = this.props.life;
		const enemyMaxLife = this.props.maxLife;

		const hitTheEnemy = () => this.props.strike();

		return (
			<button
				className="enemy"
				onClick={ hitTheEnemy }
			>
					<img src={ castleImage } className="enemy__image" />

				<h2>{ enemyLife } / { enemyMaxLife }</h2>
			</button>
		)
	}

	componentWillReceiveProps(nextProps) {
		const damaged = this.props.life - nextProps.life;
		if (damaged > 0) {
			this.emitDamageCounter(damaged);
		}
	}

	emitDamageCounter(damage) {
		const position = getElementCenter(ReactDOM.findDOMNode(this));
		const counter = createElementFromHTMLString(`
			<div
				class="enemy__damage-counter"
				style="
					left: ${position.left}px;
					top: ${position.top}px;
				"
			>
				${damage}
			</div>
		`);
		counter.addEventListener('animationend', removeThis);
		appendToBody(counter);
	}
}

function mapStateToProps({ enemy: { life, maxLife } }) {
	return { life, maxLife }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({craftItem, strike, moneyChange}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Enemy);