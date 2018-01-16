import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hireMercenary } from "../actions";

require("styles/Tavern.scss");

import Mercenary from "./Mercenary.jsx";
import Coin from "./Coin.jsx";

class Tavern extends Component {
	render() {
		const heroMoney = this.props.money;
		const listOfMercenaries = this.mapMercenaries();

		return (
			<div className="tavern">


				<ul className="tavern__rooms">
					<li className="tavern__room">
						<Coin layout='big'>{heroMoney}</Coin>
					</li>
					{listOfMercenaries}
				</ul>
			</div>
		);
	}

	mapMercenaries() {
		return this.props.mercenaries.map((mercenary, index) => {
			const key = mercenary.id;
			const numberOfMercenaries = this.props.mercenariesNumber[index];
			const isAffordable = this.props.mercenariesAffordability[index];
			const stats = mercenary;

			const hire = () => this.props.hireMercenary(index);
			
			return (
				<li className="tavern__room" key={key}>
					<Mercenary
						key={key}
						number={numberOfMercenaries}
						stats={stats}
						isAffordable={isAffordable}
						onClick={hire}
					/>
				</li>
			);
		});
	}

	hireMercenary(id) {
		this.props.hireMercenary(id);
	}
}

function mapStateToProps({ mercenaries, mercenariesNumber, mercenariesAffordability, money }) {
	return { mercenaries, mercenariesNumber, mercenariesAffordability, money };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ hireMercenary }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tavern);
