import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';

class MatchDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      profile: null,
      
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getProfile();
  }

  /** gets the balance for this account */
  getProfile = () => {
   LernappAPI.getAPI().getProfile(this.props.profileID).then(profile =>
      this.setState({
        profile: profile,
        
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          profile: null,
          
        })
      );
    }


  /** Renders the component */
  render() {
    const { profileID } = this.props;
    const { profile } = this.state;

    return (
      <Paper>
        <Typography>
          ID: {profileID}
        </Typography>
        {
          profile ?
            <Typography>
              Profile: {profile.getLastname()}, {profile.getFirstname()}
            </Typography>
            : null
        }
      </Paper>
    );
  }
}


export default MatchDetail;