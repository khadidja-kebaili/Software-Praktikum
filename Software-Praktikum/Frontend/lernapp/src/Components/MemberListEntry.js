import React, { Component } from 'react';
import { withStyles, Button, ListItem, Typography } from '@material-ui/core';
import LoadingProgress from './Dialog/LoadingProgress';


/**
 * @author [Mihriban Dogan](https://github.com/mihriban-dogan)
 */

class MemberListEntry extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingInProgress: false,
    };
  }


//Es werden die einzelnen Mitglieder gerendert 
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

/** Komponente CSS  */
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