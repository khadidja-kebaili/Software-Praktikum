import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ListItem from '@material-ui/core/ListItem';
import {Typography, IconButton, Grid, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';

import GruppenForm from './Components/GruppenForm';
import GruppeDelete from './Components/GruppeDelete';



class GruppeEintrag extends Component {
    constructor(props){
        super(props);


        //leerer Status
        
        this.state = {
            showSemesterForm: false,
            showSemesterDelete: false,
            error: null,
            loadingInProgress: false,
        }