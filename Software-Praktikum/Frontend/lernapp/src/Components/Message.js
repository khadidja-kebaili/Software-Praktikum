import React, { Component } from 'react';
import { withStyles,
        ListItem,
        Typography,
        Button } from '@material-ui/core';
import LernappAPI from '../API/LernappAPI';

/**
 * 
 * @author [Ha Mi Duong](https://github.com/HamiDuong)
 */

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: ''
        };
    }

    getUserName = () => {
        LernappAPI.getAPI().getProfile(this.props.messages.get_profile_id()).then( profile =>
            this.setState({
                name: profile.getFirstname()
            })
        )
    };

    componentDidMount(){
        this.getUserName()
    }

    render(){
        const {classes, messages} = this.props;
        const {name} = this.state;

        return (
            <div>
                <ListItem>
                    <Typography className={classes.chatEntry}>
                        {name} : {messages.get_text()}
                    </Typography>
                </ListItem>
            </div>
        )
    }
}
const styles = theme => ({
    root: {
        width: '100%'
    }
})


export default withStyles(styles)(Message);