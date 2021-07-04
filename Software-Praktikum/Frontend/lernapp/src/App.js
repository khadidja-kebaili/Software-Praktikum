import React from 'react';
import MatchList from './Components/Pages/MatchList';
import RequestList from './Components/Pages/RequestList';
import ChatList from './Components/ChatList';
import Header from './Components/Layout/Header';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
// import DeleteRequest from "./Components/Dialog/DeleteRequest";
import GroupList from "./Components/GroupList";
import GroupListForProfile from "./Components/GroupListForProfile";
import ProfileOperations from "./Components/Pages/ProfileOperations"
import firebase from 'firebase/app';
import 'firebase/auth';
import SignIn from './Components/Pages/SignIn';
import firebaseConfig from './firebaseConfig';
import ContextErrorMessage from "./Components/Dialog/ContextErrorMessage";

/**
 * 
 * Die einzelnen Komponente werden hier aufgerufen.
 * Dadurch können wir sie auf der Webseite anzeigen lassen.
 * 
 * @author [Esra Özkul (geb.Copuro)](https://github.com/EsraCopuro)
 */

class App extends React.Component {

	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}

	/** 
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 * 
	 * @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
 	 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
	}

	/** Handles firebase users logged in state changes  */
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			// The user is signed in
			user.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;
				const uid = user.uid;
				// Set the user not before the token arrived 
				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				}); console.log(uid)
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

  /** 
   * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
	 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
	 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	/**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 * 
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}

//im ersten Schritt sollen die Matches und Navigation angezeigt werden.
//Durch Redirect kann die URL weitergeleietet werden.
//Route ermöglicht es dass eine bestimmte Path zugeordnet werden kann.
  render(){
    const { currentUser, appError} = this.state;
    return(
      
        <div>
          <Router>
            <Container maxWidth='md'>
            < Container user={currentUser} />
              <Header user={currentUser}/>
              {
                // Is a user signed in?
				currentUser ?
                <>
                  <Redirect from='/' to='matchmaker'/>
                  <Route exact path='/matchmaker'>
                    <MatchList/>
                  </Route>
                  <Route exact path='/request'>
                    <RequestList/>
                  </Route>
                  <Route exact path='/chats'>
                    <ChatList/>
                  </Route>
                  <Route path='/groups'>
                      <GroupList/>
                  </Route>
                  <Route path='/mygroups'>
                      <GroupListForProfile/>
                  </Route>
                  <Route path='/profil'>
                    <ProfileOperations></ProfileOperations>
                  </Route>
                </>
                :
								// else show the sign in page
								<>
									<Redirect to='/index.html' />
									<SignIn onSignIn={this.handleSignIn} />
								</>
              }

            </Container>
          </Router>
			<ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
          </div>
    )
  }
}

export default App; 
