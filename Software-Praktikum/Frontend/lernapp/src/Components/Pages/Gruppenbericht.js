import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles } from '@material-ui/core/styles';



//Es wird eine User in einer Gruppe mit allen not wendigen Informationen dargestellt
 


class GruppenBericht extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            Gruppe: null,
            GruppeID: null,
            Gruppenname: null,
            UserProfil: null,
            name: null,
            vorname: null,
            alter: null,
            semester: null,
            studiengang: null,
            hobbies: false,
            error: null
        }}}
