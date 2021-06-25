import React, {Component} from 'react';
import { Grid, Typography } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import GroupRequestListEntry from './GroupRequestListEntry';




class GroupRequestList extends Component {
    constructor(props){
        super(props);
        
    }
        
    
    // Die Funktion getRequest() soll die request anzeigen
    getRequest =() => {}

  
    

    //Die Komponente die gerendert werden
    render(){
        const{request}=this.state
            return(
                <div id='head'>
                    <Grid item>
                        <Typography id='title'>
                            Hier sind deine Anfragen:
                        </Typography>
                    </Grid>
                    
                </div> 
                )
            }
        }
    


export default (GroupRequestList);