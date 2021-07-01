import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class LeaveGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

    leaveGroup= () => {
      let data = 1;
      LernappAPI.getAPI().deleteTargetedChataccess(data, this.props.groups.getChatid()).then(this.props.onClose(this.props.groups))
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
              <DialogTitle id="alert-dialog-title">{"Willst du wirklich die Gruppe verlassen?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Wenn du auf Verlassen klickst wirst du aus der Gruppe entfernt.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.props.onClose} >
                 Abbrechen
                </Button>
                <Button onClick={this.leaveGroup}color="primary" autoFocus>
                  Verlassen
                </Button>
              </DialogActions>
            </Dialog>
          </div>
    );
  }
}


export default LeaveGroup;
