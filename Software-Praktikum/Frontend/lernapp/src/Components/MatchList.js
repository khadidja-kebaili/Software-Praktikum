import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import {LernappAPI} from '../API/LernappAPI';
import Error_Message from './Dialog/Error_Message';
import Ladevorgang from './Dialog/Ladevorgang';
import Matchform from './Dialog/MatchForm';
import MatchListEntry from './MatchListEntry';

class MatchList extends Component {
    constructor(props){
        super(props);

        let expandendID = null;

        if (this.props.lacation.expandMatch) {
            expandendID = this.props.lacation.expandMatch.getID();    
        }
        //Eine leere INIT setzten
        this.state={
            matches: [],
            filteredMatches:[],
            matchesFilter:'',
            error: null,
            loadingInProgress: false,
            expandedMatchID: expandendID,
            showMatchForm: false
        };
    }
    getMatches = () => {
        LernappAPI.getAPI().getMatches()
        .then(matchesBOs =>
            this.setState({
                matches: matchesBOs,
                filteredMatches: [...matchesBOs],
                loadingInProgress: false,
                error: null
            })).catch(e =>
                this.setState({
                    matches: [],
                    loadingInProgress: false,
                    error: e
                })
                );
            this.setState({
                loadingInProgress: true,
                error: null
            });
        
    }
    
}