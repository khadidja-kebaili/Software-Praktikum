import React,  {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Chatraum extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <div>
                <div className="Texteingabe">
                    <TextField/>
                </div>
                <div className="senden">
                    <Button onClick={this.sendMessage}>Senden</Button>
                </div>
            </div>
        );
    }

}