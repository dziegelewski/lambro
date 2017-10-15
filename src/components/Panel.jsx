import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetGame } from '../actions';

require('styles/Panel.scss');

class Panel extends Component {
	render() {
		return (
			<div className="panel">
				<button className="panel__button" onClick={this.props.resetGame.bind(this)}>Reset</button>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({resetGame}, dispatch)

}

export default connect(null, mapDispatchToProps)(Panel);