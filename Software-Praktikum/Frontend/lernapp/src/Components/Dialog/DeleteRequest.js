import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from '../../API/LernappAPI';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteRequest extends Component {
    constructor(props){
        super(props);
        
        console.log(props);
        let otherUser = null;

        this.state = {
            currentUser : 1,
            requestedBy: otherUser
            
        };
    }

        
      handleClose = () => {
        this.props.onClose(null);
    }

    render() {
        return(
            <div>
                <Dialog open={this.props.show}>
                    <DialogTitle id="alert-dialog-title">Willst du wirklich die Anfrage löschen?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Wenn Sie auf Ablehnen klicken wird der Request für immer gelöscht
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.props.onClose}>
                            Abbrechen
                        </Button>
                        <Button color="primary" onClick={this.props.deleteRequest}>
                            Ja, Ablehnen
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }}


export default DeleteRequest;