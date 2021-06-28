import React, {Component} from 'react';
import ChatListEntry from './ChatListEntry';
import LernappAPI from "../API/LernappAPi";
import LoadingProgress from './Dialogs/LoadingProgress'
import {Grid, 
        withStyles,
        Grid,
        Typography,
        withStyles
        } from '@material-ui/core';

class ChatList extends Component{
    constructor(props){
        super(props);

        this.state = {
            chats: [],
            loadingInProgress: false,
            error: null
        }
    }

    // Chaträume des aktuellen Users holen
    getChats = () => {
        //hier muss in der Methode später die ID des aktuellen Users übergeben werden
        LernappAPI.getAPI().getGroupchatsByProfil(2).then(ChatroomBOs =>
//        LernappAPI.getAPI().get_GroupchatsByProfil(this.props.profile.getID()).then(ChatroomBOs =>
            this.setState({
                Chats: ChatroomBOs,
                loadingInProgress: false,
                error: null
            })).catch(e =>
                this.setState({
                    Chats: [],
                    loadingInProgress: false,
                    error: e
                })
            )
        this.setState({
            loadingInProgress: true,
            error: null
        })
    }

    componentDidMount(){
        this.getChats();
    }

    render(){
        const { chats, loadingInProgress, error} = this.state;
        return (
            <div>
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item xs={4}>
                        <TextField
                            autoFocus
                            fullWidth
                            id='customerFilter'
                            type='text'
                            value={groupFilter}
                            onChange={this.filterFieldValueChange}
                        />
                    </Grid>
                    <Grid item xs/>
                </Grid>
                {
                    chats.map(chats =>
                        <ChatListEntry key={chats.getID()} chats={chats}
                        />)
                }
                <LoadingProgress show={loadingInProgress} />
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    ChatList: {
        marginBottom: theme.spacing(2),
    },
});

export default withStyles(styles)(ChatList);