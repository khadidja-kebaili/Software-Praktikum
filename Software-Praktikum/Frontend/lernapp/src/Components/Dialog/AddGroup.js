import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import GroupBO from "../../API/GroupBO";
import {DialogContent, Dialog, DialogContentText, DialogActions, DialogTitle} from "@material-ui/core";

/**
 * Dialog für das Erstellen einer neuen Gruppe. Der currentUser ist hierbei automatisch auch der Gruppenadmin.
 * Er kann einen Gruppennamen auswählen und eine Gruppenbeschreibung.
 *
 * @author: Khadidja Kebaili
 */


class AddGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupname : "",
            description: "",

        };
    }

    //
    handleChange = (e) =>{
        this.setState({ [e.target.name] : e.target.value });}

    //Fügt neue Gruppe hinzu, indem es die Werte des States in ein neues GroupBO umwandelt.
    addGroup = () => {
        var chatid = 1;
        let data = this.props.googleId
        let newGroup = new GroupBO(
            this.state.groupname,
            data,
            this.state.description,
            chatid);
            console.log(this.props.googleId)
            LernappAPI.getAPI().addGroup(newGroup).then(console.log(newGroup));
            this.handleClose()
    }

    //Behandelt die Schließung des Dialogs.
    handleClose = () => {
        this.props.onClose(null);
    }

    //Schließt den Gruppe-verlassen-Dialog
    closeLeaveGroupDialog = (groups) => {
        // if customer is not null, delete it
        if (groups) {
            this.props.groupAdded(groups);
        };

        // Don´t show the dialog
        this.setState({
            showLeaveGroup: false
        });
    }


    render() {
        let header = 'Erstelle deine eigene Lerngruppe!'
        const {groupname, description} = this.state
        return (
            <div>
                <Dialog open={this.props.show} onClose = {this.handleClose} >
                    <DialogTitle>Erstelle deine eigene Lerngruppe</DialogTitle>
                    <DialogContent>
                <form onSubmit={this.addGroup}>
                    <div>
                        <div className="Groupname"><TextField name="groupname" label="Gruppenname" variant="outlined" value ={groupname} onChange={this.handleChange}/> </div>
                        <div className="Description"><TextField name="description" label="Beschreibung" variant="outlined" value ={description} onChange={this.handleChange}/> </div>
                    </div>
                </form>
                    </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" color="primary" size="large" onClick={this.addGroup} color='primary'>
                        Erstellen
                    </Button>
                    <Button onClick={this.handleClose}>Oder vlt doch nicht...</Button>
                </DialogActions>
                </Dialog>
            </div>

        );
    }
}

export default AddGroup;