import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';




class RequestListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            request: props.profiles,
        };
    }

    render() {
        const{request}=this.state;
        
        return(
            <div>
                
                <Typography>
                    {request.getFirstname()}, {request.getLastname()}, {request.getLearnstyle()}, {request.getStudytime()},
                    {request.getStudyplace()}, {request.getStudyfrequence()}
                 <Button color='primary' flex="flex-end" > Annehmen </Button>
                 <Button color="secondary">
                    Ablehnen
                </Button>
                 </Typography>
               
                
            </div>
        );
    }
}

export default RequestListEntry