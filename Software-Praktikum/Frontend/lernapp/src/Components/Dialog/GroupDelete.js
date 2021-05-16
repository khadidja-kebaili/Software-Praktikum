import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class GroupDelete extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  deleteGroup = () => {
    let data = 6;
    LernappAPI.getAPI().deleteGroup(data).then(this.props.onClose(null))
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
              <DialogTitle id="alert-dialog-title">{"Willst du wirklich diese Gruppe löschen?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Wenn du auf Löschen klickst wird diese Gruppe endgültig gelöscht. 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.props.onClose} >
                 Abbrechen
                </Button>
                <Button color="primary" onClick={this.deleteGroup} autoFocus>
                  Löschen
                </Button>
              </DialogActions>
            </Dialog>
          </div>
    );
  }
}
export default GroupDelete;