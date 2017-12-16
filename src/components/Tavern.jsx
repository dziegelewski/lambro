import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hireMercenary } from '../actions';

require('styles/Tavern.scss');

import Mercenary from './Mercenary.jsx';

class Tavern extends Component {
	render() {

		const heroMoney = this.props.money;
		const listOfMercenaries = this.mapMercenaries();

		return (
			<div className="tavern">
				Money: { heroMoney }
				<ul className="tavern__rooms">
					{ listOfMercenaries }
				</ul>
			</div>
		)
	}

	mapMercenaries() {

		return this.props.mercenaries.map((mercenary, index) => {

			const key = mercenary.id;
			const numberOfMercenaries = this.props.mercenariesNumber[index];
			const stats = mercenary;

			const hireMercenary = () => {
					this.props.hireMercenary(index);
			}

			return (

				<Mercenary
					key={ key }
					number={ numberOfMercenaries }
					stats={ stats }
					hireMercenary = { hireMercenary }
				/>
				)
			})
	}

	hireMercenary(id) {
		this.props.hireMercenary(id);
	}
}

function mapStateToProps({mercenaries, mercenariesNumber, money}) {
	return {mercenaries, mercenariesNumber, money}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ hireMercenary }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tavern);