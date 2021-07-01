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

        this.state = {
            deletingInProgress: false,
            deletingError: null
            
        };
    }

    deleteRequest = (id1) => {
        LernappAPI.getAPI().deleteRequest(this.props.request.getID()).then(request => {
            this.setState({  // Set new state when AccountBOs have been fetched
                deletingInProgress: false, // loading indicator
                deletingError: null
            })
            // console.log(account);
            this.props.onClose(this.props.request);
        }).catch(e =>
            this.setState({ // Reset state with error from catch
                deletingInProgress: false,
                deletingError: e
            })
        );

        // set loading to true
        this.setState({
            deletingInProgress: true,
            deletingError: null
        });
    }


    deleteGroupRequest = (id1) => {
        LernappAPI.getAPI().deleteRequest(this.props.requestGroup.getID()).then(request => {
            this.setState({  // Set new state when AccountBOs have been fetched
                deletingInProgress: false, // loading indicator
                deletingError: null
            })
            // console.log(account);
            this.props.onClose(this.props.request);
        }).catch(e =>
            this.setState({ // Reset state with error from catch
                deletingInProgress: false,
                deletingError: e
            })
        );

        // set loading to true
        this.setState({
            deletingInProgress: true,
            deletingError: null
        });
    }
        
      handleClose = () => {
        this.props.onClose(null);
    }

    render() {
        return(
            <div>
                <Dialog open={this.props.show} onClose = {this.handleClose}>
                    <DialogTitle id="alert-dialog-title">Willst du wirklich die Anfrage löschen?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Wenn Sie auf Ablehnen klicken wird der Request für immer gelöscht
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>
                            Abbrechen
                        </Button>
                        <Button color="primary" onClick={this.deleteRequest}>
                            Ja, Ablehnen
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }}


export default DeleteRequest;