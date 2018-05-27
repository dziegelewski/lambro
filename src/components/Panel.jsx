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
		const { isExpanded } = this.state;

		if (!isExpanded) {
			const expand = () => this.setState({ isExpanded: true });
			return (
			<div className="panel panel--collapsed" >
				<button onClick={expand}>
					<img src={gear} className="panel__icon panel__icon--gear"/>
				</button>
			</div>
			)

		}

		const resetGame = () => this.props.resetGame();
		const collapse = () => this.setState({ isExpanded: false });
		const showAboutPage = () => this.setState({ page: 'about' });
		const goBack = () => this.setState({ page: null });
		const resetAndCollapse = () => {
			resetGame();
			collapse();
		}


		return (
			<div className="panel panel--expanded">

				{ !this.state.page && 
					<div className="panel__inner">
						<button className="panel__option" onClick={collapse}>Resume game</button>
						<button className="panel__option" onClick={resetAndCollapse}>Start over</button>
						<button className="panel__option" onClick={showAboutPage}>About</button>
					</div>

				}

				{ this.state.page === 'about' && 
					<div className="panel__inner">
						<Copyright />
						<button className="panel__option" onClick={goBack}>Go back</button>
					</div>
				}

			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ resetGame }, dispatch);
}

export default connect(null, mapDispatchToProps)(Panel);
