import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { regenerate } from '../actions';

class Regeneration extends Component {
	render() {
		
		setInterval(
			() => this.props.regenerate(1),
			1000
		)

		return null;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ regenerate }, dispatch)
}

export default connect(null, mapDispatchToProps)(Regeneration);