import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RequestBO from '../../API/RequestBO';
import LernappAPI from '../../API/LernappAPi';

class AddRequest extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.baseState = this.state;
    }

    addRequest =() => {
        let newRequest = new RequestBO(
            this.state.requestedBy,
            this.state.requested,
            this.state.request_type,
        );

        LernappAPI.getAPI().addRequest(newRequest).then(console.log(newRequest))
    }

    render() {
        return(
            <div>
                
                <Button type="submit" variant="contained" color="primary" onClick={this.addRequest} color='primary'>
                    Anfrage stellen
                </Button>
                 
            </div>
        )
    }
}

export default AddRequest;

