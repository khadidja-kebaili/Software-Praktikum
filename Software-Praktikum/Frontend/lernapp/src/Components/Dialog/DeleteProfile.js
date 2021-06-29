import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class DeleteProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  deleteProfile = () => {
    let data = 6;
    LernappAPI.getAPI().deleteProfile(data).then(this.props.onClose(null))
    };

  handleClose = () => {
    // console.log(event);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {

        return (
          <div>
            <Dialog open={this.props.show}>
              <DialogTitle id="alert-dialog-title">{"Willst du wirklich dein Profil und dein Konto löschen?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Wenn du auf Löschen klickst wird dein Konto in der Lernapp endgültig gelöscht. 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.props.onClose} >
                 Abbrechen
                </Button>
                <Button color="primary" onClick={this.deleteProfile} autoFocus>
                  Löschen
                </Button>
              </DialogActions>
            </Dialog>
          </div>
    );
  }
}


export default DeleteProfile;
