import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetGame } from '../actions';

require('styles/Panel.scss');

class Panel extends Component {

	render() {

		const resetGame = this.props.resetGame.bind(this);

		return (
			<div className="panel">
				<button className="panel__button" onClick={ resetGame }>Reset</button>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ resetGame }, dispatch)
}

export default connect(null, mapDispatchToProps)(Panel);