import React, { Component } from 'react';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

  
class SignIn extends Component {

	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}
    
	render() {
	

		return (
			<div>
				<Typography  align='center'>Melde dich an :)</Typography>
				<Typography  align='center'>In wenigen Klicks gehts los!</Typography>
				<Grid container direction="column"  justify="space-between" alignItems="center" spacing={2}>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Login
      			</Button>
                	</Grid> 
				</Grid>
			</div>
		);
	}
}



export default SignIn
