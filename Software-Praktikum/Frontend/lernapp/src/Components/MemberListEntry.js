
import React, { Component } from 'react';
import { withStyles, Button, ListItem, ListItemSecondaryAction, Link, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link as RouterLink } from 'react-router-dom';
import LernappAPI  from '../API/LernappAPI';
import LoadingProgress from './Dialog/LoadingProgress';



class MemberListEntry extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      loadingInProgress: false,
    };
  }



  
 

  /** Renders the component */
  render() {
    const { classes, members} =  this.props;
    const { loadingInProgress} = this.state;

    return (
      <div>
        <ListItem>
          <Typography className={classes.memberEntry}>
              <b>Mitglied:</b> {members.getFirstname()}, {members.getLastname()}
          </Typography>
        </ListItem>
        <ListItem>
          <LoadingProgress show={loadingInProgress} />
        </ListItem>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%'
  }, 
  buttonMargin: {
    marginRight: theme.spacing(2),
  },
  memberEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

export default withStyles(styles)(MemberListEntry);
