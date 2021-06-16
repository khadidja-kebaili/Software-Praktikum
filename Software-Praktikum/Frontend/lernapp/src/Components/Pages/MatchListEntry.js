import React, { Component } from 'react';
import {Typography} from '@material-ui/core';

class MatchListEntry extends Component{
    constructor(props){
        super(props);

        this.state = {
            matches: props.profiles,
        };
    }
    
  
    render() {
        
        const { matches} = this.state;

        return (
            <div>
                <Typography variant='body1'>
                {matches.getFirstname()}, {matches.getLastname()}, {matches.getLearnstyle()}, {matches.getStudytime()}, 
                {matches.getStudyplace()}, {matches.getStudyfrequence()}
                </Typography>
            </div>
        );
    }
}

export default MatchListEntry