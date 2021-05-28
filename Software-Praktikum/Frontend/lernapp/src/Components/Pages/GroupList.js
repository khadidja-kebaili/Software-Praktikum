import React, {Component} from 'react';
import {Grid, Typography } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import GroupListEntry from './GroupListEntry';


class GroupList extends Component {
    constructor(props){
        super(props);

        this.state = {
            Group: [],
        };
    }
       
    
        //Die Komponente die gerendert werden
        render(){
        
            return (
              <div>
                  <Grid item>
                    <Typography>
                     Gruppen:
                      </Typography>
                  </Grid>  
             </div>
            );
          }
        }


export default GroupList