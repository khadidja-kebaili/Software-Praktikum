import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link, 
	Redirect
  } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";

  
class LogIn extends Component {


	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}
    

	/** Renders the sign in page, if user objext is null */
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.paper}>
				<Paper elevation={3}>
				<Typography className={classes.root} align='center' variant='h5'>Fange an zu Lernen!</Typography>
				<Typography className={classes.root} align='center'>Melde dich an :)</Typography>
				<Typography className={classes.root} align='center'>In wenigen Klicks gehts los!</Typography>
				<Grid container direction="column"  justify="space-between" alignItems="center" spacing={2}>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Login
      			</Button>
                </Grid> 
				<TextField
					required
					id="username"
					label="Username"
					variant="filled"
					/>
					<Redirect from='/' to='login' />
					<Route exact path='/login'>
					</Route>
				<TextField
					required
					id="passwort"
					label="Password"
					type="password"
					autoComplete="current-password"
					/>
                 <Grid item >
                  <Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Registrieren
      			</Button>
					</Grid>
				</Grid>
				</Paper>
			</div>
		);
	}
}

/** Component specific styles */
const styles = theme => ({
	paper:{
		marginRight: 600,
		marginLeft: 600,
		marginTop: 100,

	},
	root: {
		margin: theme.spacing(3),
		paddingTop:20,
	}
});

/** PropTypes */
SignIn.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
	onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(LogIn)
