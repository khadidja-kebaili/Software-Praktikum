import React, { Component } from 'react';
import { withStyles,
        ListItem,
        Typography } from '@material-ui/core';
import LoadingProgress from './Dialog/LoadingProgress';
import LernappAPI from '../API/LernappAPI';

/**
 * 
 * @author [Ha Mi Duong](https://github.com/HamiDuong)
 */

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingInProgress: false
        };
    }

    render(){
        const {classes, messages} = this.props;
        const {loadingInProgress} = this.state;

        return (
            <div>
                <ListItem>
                    <Typography className={classes.chatEntry}>
                        {messages.get_profile_id()} : {messages.get_text()}
                    </Typography>
                </ListItem>
                <ListItem>
                    <LoadingProgress show={loadingInProgress}/>
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