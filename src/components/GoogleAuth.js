import React from 'react';

class GoogleAuth extends React.Component {

   #CLIENT_ID = '1026202403796-a855t9dnolgn3vkpdul8q205phvglsd9.apps.googleusercontent.com';
   #gapi = window.gapi;
   #auth = null;

   state = {isSignedIn: null}

   componentDidMount() {
      this.#gapi.load('client:auth2', () => {
         this.#gapi.client.init({
            clientId: this.#CLIENT_ID,
            scope: 'email'
         }).then(() => {
            this.#auth = this.#gapi.auth2.getAuthInstance();
            this.setState({ isSignedIn: this.#auth.isSignedIn.get() });
            this.#auth.isSignedIn.listen(this.onAuthChange);
         }).catch(err => {
            throw new Error(`Google sign in failed with message : ${err.message}`);
         });
      });
   }

   onAuthChange = () => this.setState({ isSignedIn: this.#auth.isSignedIn.get() });

   onSignInClick = () => this.#auth.signIn();

   onSignOutClick = () => this.#auth.signOut();

   renderAuthButton() {
      if (this.state.isSignedIn === null) {
         return null;
      }

      if (this.state.isSignedIn) {
         return (
            <button className="ui red google button" onClick={this.onSignOutClick}>
               <i className="google icon"/>
               Sign Out
            </button>
         );
      }

      if (!this.state.isSignedIn) {
         return (
            <button className="ui red google button" onClick={this.onSignInClick}>
               <i className="google icon"/>
               Sign In with GOOGLE
            </button>
         );
      }
   }

   render() {
      return (
         <div>{this.renderAuthButton()}</div>
      );
   }
}

export default GoogleAuth;