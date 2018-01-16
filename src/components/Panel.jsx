import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { resetGame } from "../actions";

const gear = require('../images/gear-white.svg');
const arrow = require('../images/arrow-white.svg');

require("styles/Panel.scss");

class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false
		};
	}

	render() {
		return this.state.isExpanded ? this.renderExpanded() : this.renderCollapsed();
	}

	renderExpanded() {
		const resetGame = () => this.props.resetGame();
		const collapse = () => this.setState({ isExpanded: false });

		return (
			<div className="panel panel--expanded">
				<div className="panel__buttons">
					<button className="panel__button" onClick={resetGame}>
						Reset
					</button>
					<button className="panel__button panel__button--spacious" onClick={collapse}>
						<img src={arrow} className="panel__icon panel__icon--arrow" />
					</button>
				</div>
			</div>
		);
	}

	renderCollapsed() {
		const expand = () => this.setState({ isExpanded: true });
		return (
		<div className="panel panel--collapsed" >
			<button onClick={expand}>
				<img src={gear} className="panel__icon panel__icon--gear"/>
			</button>
		</div>

		)

	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ resetGame }, dispatch);
}

export default connect(null, mapDispatchToProps)(Panel);
