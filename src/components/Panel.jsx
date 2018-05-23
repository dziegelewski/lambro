import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { resetGame } from "actions";
import Copyright from 'components/Copyright.jsx';

const gear = require('images/gear-white.svg');

require("styles/Panel.scss");

class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
			displayPage: null
		};
	}

	render() {
		return this.state.isExpanded ? this.renderExpanded() : this.renderCollapsed();
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

	renderExpanded() {
		const resetGame = () => this.props.resetGame();
		const collapse = () => this.setState({ isExpanded: false });
		const showAboutPage = () => this.setState({ page: 'about' });
		const goBack = () => this.setState({ page: null });
		const resetAndCollapse = () => {
			resetGame();
			collapse();
		}

		if (this.state.page === 'about') {
			return (
				<div className="panel panel--expanded">
					<div className="panel__inner">

						<Copyright />
						<button className="panel__option" onClick={goBack}>Wróć</button>
					
					</div>
				</div>
				);
		}



		return (
			<div className="panel panel--expanded">
				<div className="panel__inner">

					<button className="panel__option" onClick={collapse}>Powrót do gry</button>
					<button className="panel__option" onClick={resetAndCollapse}>Zacznij od nowa</button>
					<button className="panel__option" onClick={showAboutPage}>O grze</button>

				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ resetGame }, dispatch);
}

export default connect(null, mapDispatchToProps)(Panel);
