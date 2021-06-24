import React, {Component} from 'react';
import {Grid, Typography } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPi';
import MatchListEntry from './MatchListEntry';


class MatchList extends Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [],
        };
    }
        componentDidMount(){
            this.getMatches();
        }
      
    getMatches = () => {
       LernappAPI.getAPI().getMatches().then(profileBOs =>
       this.setState({
            matches: profileBOs,
         }))}
      
    
        //Die Komponente die gerendert werden
        render(){
        
           const {matches}= this.state
            return (
              <div>
                  <Grid item>
                    <Typography>
                     Hier sind deine Matches:
                      </Typography>
                  </Grid>
                { 
                   matches.map(profiles =>
                    <MatchListEntry key={profiles.getID()} profiles={profiles}/>)
                }
             </div>
            );
          }
        }


export default MatchList