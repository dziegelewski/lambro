import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetGame, regenerate } from '../actions';

require('styles/Panel.scss');

class Panel extends Component {
	constructor(props) {
		super(props);

		setInterval(function() {
			props.regenerate(1)
		}, 100)
	}
	render() {
		return (
			<div className="panel">
				<button className="panel__button" onClick={this.props.resetGame.bind(this)}>Reset</button>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({resetGame, regenerate}, dispatch)

}

export default connect(null, mapDispatchToProps)(Panel);