import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Button, IconButton, Dialog, DialogContent, 
    DialogContentText, DialogTitle, DialogActions, TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/* später für die tabs !!
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';*/




//Gruppe erstellen und bearbeiten 

class GruppenForm extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status aus
        this.state = {
            name: '',
            nameValidationFailed: false,
            nameEdited: false,

            addingError: null,
            addingInProgress: false,

            updatingError: null,
            updatingInProgress: false
        };
        this.baseState = this.state;
    }}

     // Component wird gerendert 
     render() 
        const { classes, show, Gruppe } = this.props;
        const {
            name,
            nameValidationFailed,
            nameEdited,

            addingInProgress,
            addingError,
            updatingInProgress,
            updatingError, } = this.state;

        let title = '';
        let header = '';

        if (Gruppe) {
            // Wenn das Gruppen objekt true ist, dann ein edit
            title = `Gruppe "${Gruppe.name}" bearbeiten`;
            
        } else {
            title = 'Neues Gruppe erstellen';
        
        }

        return (
            show ?
                <Dialog open={show} onEnter={this.getInfos} onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle className={classes.dialogtitle}>{title}
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {header}
                        </DialogContentText>

                        <form className={classes.root} noValidate autoComplete='off'>

                            <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='small' id='name' label='Gruppe' variant="outlined" value={name}
                                onChange={this.textFieldValueChange} error={nameValidationFailed} />

                        </form>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {
                            // Erro, wenn es nicht funktioniert hat 
                            Gruppe ?
                                <ContextErrorMessage error={updatingError} contextErrorMsg={`Gruppe ${Gruppe.getID()} konnte nicht gefunden werden.`} onReload={this.updateGruppe} />
                                :
                                <ContextErrorMessage error={addingError} contextErrorMsg={`Diese Gruppe konnte nicht erstellt werden.`} onReload={this.addGruppe} />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>
                            Abbrechen
                        </Button>
                        {
                            // Wenn eine Gruppe verfügbar ist, drück auf den Gruppe anfragen button, sonst füge eine neue Gruppe hinzu
                            Gruppe ?
                                <Button disabled={nameValidationFailed} variant='contained' onClick={this.updateGruppe} color='primary'>
                                    Gruppe anfragen 
                        </Button>
                                :
                                <Button disabled={nameValidationFailed || !nameEdited}
                                    variant='contained' onClick={this.addGruppe} color='primary'>
                                    Neue Gruppe erstellen 
                        </Button>
                        }
                    </DialogActions>
                </Dialog>
                : null
        );
    

