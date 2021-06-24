import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RequestBO from '../../API/RequestBO';
import LernappAPI from '../../API/LernappAPI';
import { ThemeConsumer } from 'react-native-elements';

class AddRequest extends Component {
    constructor(props){
        super(props);
        let rqustBY ='', rqusted='', currentUser= 5

        if (props.request){
            rqustBY = props.request.getRequestedBy();
            rqusted = props.request.getRequested();

        }
        this.state = {
            requestedBy : rqustBY,
            requested : rqusted
        };

        this.handleChange = this.handleChange.bind(this);
        this.baseState = this.state;
    }
    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value}); 
    }

    addRequest =() => {
        let newRequest = new RequestBO(
            this.state.requestedBy,
            this.state.requested
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