import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LernappAPI  from '../API/Lernappapi';
import GroupListEntry from './GroupListEntry';
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";


class GroupList extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            groups: [],
            loadingInProgress: false,
            loadingError: null,
        };
    }
    /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {
        this.getAllGroups();
    }


    /** Fetches GroupBOs for the current profile */
    getAllGroups = () => {
        LernappAPI.getAPI().getAllGroups().then(groupBOs =>
            this.setState({  // Set new state when GroupBOs have been fetched
                groups: groupBOs,
                loadingInProgress: false,
                loadingError: null
            })).catch(e =>
                this.setState({ // Reset state with error from catch
                    groups: [],
                    loadingInProgress: false,
                    loadingError: e
                 })
            );
        this.setState({
            loadingInProgress: true,
            loadingError: null
        });
    }

    addnewGroup = () => {
        LernappAPI.getAPI().addGroup().then(groupBO => {
            console.log(groupBO)
            this.setState({  // Set new state when AccountBOs have been fetched
                accounts: [...this.state.groups, groupBO],
                loadingInProgress: false, // loading indicator
                addingAccountError: null
            })
        }).catch(e =>
            this.setState({ // Reset state with error from catch
                loadingInProgress: false,
                addingAccountError: e
            })
        );

        // set loading to true
        this.setState({
            loadingInProgress: true,
            addingAccountError: null
        });
    }


    /** Renders the component */
    render() {
        const { groups, loadingInProgress, loadingError} = this.state;
        const {classes, profile} = this.props

        // console.log(this.props);
        return (
            <div>
                {groups.map(groups => <GroupListEntry key={groups.getID()} groups={groups}/>)}
                <LoadingProgress show={loadingInProgress} />
                <Button className={classes.addGroupButton} variant='contained'  startIcon={<AddIcon />} onClick={this.addnewGroup}>
                    Add Group
                </Button>
            </div>
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
    },
    groupList: {
        marginBottom: theme.spacing(2),
    },
    addGroupButton: {
        position: 'absolute',
        right: theme.spacing(3),
        bottom: theme.spacing(1),
    }
});

export default withStyles(styles)(GroupList);