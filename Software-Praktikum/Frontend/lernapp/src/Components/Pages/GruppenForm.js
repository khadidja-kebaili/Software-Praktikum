import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles, Button, IconButton, Dialog, DialogContent, DialogContentText,
    DialogTitle, DialogActions, TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';



//Gruppe erstellen und bearbeiten 

class GruppenForm extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
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