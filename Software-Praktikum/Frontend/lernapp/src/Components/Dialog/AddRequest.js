import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RequestBO from '../../API/RequestBO';
import LernappAPI from '../../API/LernappAPI';

class AddRequest extends Component {
    constructor(props){
        super(props);
        let rqustBY ='', rqusted='', rqust_type='', currentUser= 5

        if (props.request){
            rqustBY = props.request.getRequestedBy();
            rqusted = props.request.getRequested();
            rqust_type = props.request.getRequestType();


        }
        this.state = {
            requestedBy : rqustBY,
            requested : rqusted,
            request_type: rqust_type
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

