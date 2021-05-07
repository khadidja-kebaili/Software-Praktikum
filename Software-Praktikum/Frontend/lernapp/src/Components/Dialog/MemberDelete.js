import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { ElectivAPI } from '../../api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


class MemberDelete extends Component {

  constructor(props) {
    super(props);



  //wird aufgerufen, wenn das Dialog geschlossen wird
  handleClose = () => {
    this.props.onClose(null);
  }

  // API Anbindung um die Gruppe über das Backend aus der Datenbank zu löschen
deleteMember = () => {
  ElectivAPI.getAPI().deleteMember(this.state.M.id)
    .then(() => {
      this.props.getMember();
      this.props.onClose(null);
    }).catch(e => {
      this.setState({
        showSnackbar: true
      })
    })
}
  // Die Komponente wird gerendert 
  render() 
    const { show } = this.props;
    const { Member } = this.state;
    return (
      <div>
        <Dialog
          open={show}
          onClose={this.handleClose}
          maxWidth='xs'
        >
          <DialogTitle>{"Sind Sie sich sicher?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Wenn Sie dieses Mitglied <b>"{Member.name}"</b> löschen möchten, klicken Sie auf "JA".
                  </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Abbrechen
                  </Button>
            <Button onClick={this.deleteMember} color="primary" autoFocus>
              Ja
                  </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={this.closeSnackbar}>
          <Alert onClose={this.closeSnackbar} severity="error">
            Dieses Mitglied kann nicht gelöscht werden
                </Alert>
        </Snackbar>
      </div>
    );
  }

}
// PropTypes 
MemberDelete.propTypes = {
  
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(MemberDelete);
