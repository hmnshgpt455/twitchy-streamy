import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	#CLIENT_ID = '1026202403796-a855t9dnolgn3vkpdul8q205phvglsd9.apps.googleusercontent.com';
	#gapi = window.gapi;
	#auth = null;

	componentDidMount() {
		this.#gapi.load('client:auth2', () => {
			this.#gapi.client
				.init({
					clientId: this.#CLIENT_ID,
					scope: 'email',
				})
				.then(() => {
					this.#auth = this.#gapi.auth2.getAuthInstance();
					this.onAuthChange(this.#auth.isSignedIn.get());
					this.#auth.isSignedIn.listen(this.onAuthChange);
				})
				.catch((err) => {
					throw new Error(`Google sign in failed with message : ${err.message}`);
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		//This isSignedIn argument is passed by GAPI library itself
		if (isSignedIn) {
			this.props.signIn(this.#auth.currentUser.get().getId());
		}

		if (!isSignedIn) {
			this.props.signOut();
		}
	};

	onSignInClick = () => this.#auth.signIn();

	onSignOutClick = () => this.#auth.signOut();

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		}

		if (this.props.isSignedIn) {
			return (
				<button className="ui red google button" onClick={this.onSignOutClick}>
					<i className="google icon" />
					Sign Out
				</button>
			);
		}

		if (!this.props.isSignedIn) {
			return (
				<button className="ui red google button" onClick={this.onSignInClick}>
					<i className="google icon" />
					Sign In with GOOGLE
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
	signIn,
	signOut,
})(GoogleAuth);
