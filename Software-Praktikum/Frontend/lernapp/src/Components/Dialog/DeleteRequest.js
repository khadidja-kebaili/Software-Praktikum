<<<<<<< HEAD
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPi";
=======
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from '../../API/LernappAPI';
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

<<<<<<< HEAD

class DeleteRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser : 1
        };
    }

    deleteRequest= () => {
        let requestID = 10;
        LernappAPI.getAPI().deleteRequest(requestID).then(this.props.onClose(null))
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
                        <Button color="primary" onClick={this.deleteRequest} autoFocus>
                            Löschen
=======
class DeleteRequest extends Component {
    constructor(props){
        super(props);
        
        // console.log(props); 

        let otherUser = null;

        if (this.props.location.expandRequest){
            otherUser = this.props.location.expandRequest.getID();
        }

        this.state = {
            currentUser : 6,
            currenRequester: otherUser
            
        };
    }
    // deleteRequest = () => {
    //     let data = 5;
    //     LernappAPI.getAPI().deleteRequest(data).then(this.props.onClose(null))
    // };
    
    
    
    deleteRequest = () => {
        const {request} = this.props;
        
        LernappAPI.getAPI().deleteRequest(this.state.currentUser, this.state.otherUser).then(
          this.props.onClose()
        )

    };
        
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
                        <Button color="primary" onClick={this.deleteRequest}>
                            Ja, Ablehnen
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
<<<<<<< HEAD
    }
}


export default DeleteRequest;
=======
    }}


export default DeleteRequest;
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
