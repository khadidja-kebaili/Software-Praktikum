import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress } from '@material-ui/core';

// Zeigt den Ladevorgang von den Matches an
class Ladevorgang extends Component {

  /** Renders die Komponente */
  render() {
    const { classes, show } = this.props;

    return (
      show ?
        <div className={classes.root}>
          <CircularProgress color='secondary' />
        </div>
        : null
    );
  }
}

/** Der Style für die Komponente */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  }
});

/** PropTypes */
Ladevorgang.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** If true, the loading progress is rendered */
  show: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Ladevorgang);