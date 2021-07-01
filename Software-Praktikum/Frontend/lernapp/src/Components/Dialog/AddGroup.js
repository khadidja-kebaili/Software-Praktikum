import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import GroupBO from "../../API/GroupBO";
import {DialogContent, Dialog, DialogContentText, DialogActions, DialogTitle} from "@material-ui/core";


class AddGroup extends Component {
    constructor(props){
        super(props);
        let currentUser = 6
        this.state = {
            groupname : "",
            admin : currentUser,
            description: "",

        };

        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) =>{
        this.setState({ [e.target.name] : e.target.value });}


    addGroup = () => {
        var chatid = 1;
        let newGroup = new GroupBO(
            this.state.groupname,
            this.state.admin,
            this.state.description,
            chatid);

            LernappAPI.getAPI().addGroup(newGroup).then(console.log(newGroup));
            this.handleClose()

    }

    handleClose = () => {
        this.props.onClose(null);
    }

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
        const {groupname, admin, description} = this.state
        return (
            <div>
                <Dialog open={this.props.show} onClose = {this.handleClose} >
                    <DialogTitle>Erstelle deine eigene Lerngruppe</DialogTitle>
                    <DialogContent>
                <form onSubmit={this.addGroup}>
                    <div>
                        <div className="Groupname"><TextField name="groupname" label="Gruppenname" variant="outlined" value ={groupname} onChange={this.handleChange}/> </div>
                        {/*<div className="Admin"><TextField name="admin" label="Admin" variant="outlined" value ={admin} onChange={this.handleChange}/> </div>*/}
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