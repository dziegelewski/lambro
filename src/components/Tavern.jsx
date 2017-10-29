import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hireMercenary, moneyChange, resetGame } from '../actions';

require('styles/Tavern.scss');

import Mercenary from './Mercenary.jsx';

class Tavern extends Component {
	render() {

		return (
			<div className="tavern">
				Money: { this.props.money }
				<ul className="tavern__rooms">
					{this.props.mercenaries.map((mercenary, index) => {
						return <Mercenary key={mercenary.id} number={this.props.mercenariesNumber[index]} stats={mercenary} hire={this.hireMercenary.bind(this)} />
					})}
				</ul>
			</div>
		)
	}

	hireMercenary(id, price) {
		if (this.props.money >= price) {
			this.props.moneyChange(-price);
			this.props.hireMercenary(id);
		}
	}
}

function mapStateToProps({mercenaries, mercenariesNumber, money}) {
	return {mercenaries, mercenariesNumber, money}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ resetGame, hireMercenary, moneyChange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tavern);