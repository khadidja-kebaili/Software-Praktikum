import React, { Component } from 'react';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LernappAPI  from '../API/LernappAPI';
import GroupListEntry from './GroupListEntry';
import LoadingProgress from "./Dialog/LoadingProgress";
// import ContextErrorMessage from "./Dialog/ContextErrorMessage";
import Typography from "@material-ui/core/Typography";


class GroupListForProfile extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            groups: [],
            currentUser : 1,
            filteredGroups: [],
            groupFilter: '',
            loadingInProgress: false,
            loadingError: null,
        };
    }
    /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */

    

    getGroupsForProfile = (id) => {
        LernappAPI.getAPI().getGroupsForProfile(id).then(groupBOs =>
            this.setState({  // Set new state when GroupBOs have been fetched
                groups: groupBOs,
                filteredGroups: [...groupBOs],
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

    componentDidMount() {
        this.getGroupsForProfile(this.state.currentUser)
    }


    filterFieldValueChange = event => {
        const value = event.target.value.toLowerCase();
        this.setState({
            filteredGroups: this.state.groups.filter(group => {
                let GroupNamecontainsValue = group.getGroupname().toLowerCase().includes(value);
                return GroupNamecontainsValue
            }),
            groupFilter: value
        });
    }

    /** Renders the component */
    render() {
        const { groups, filteredGroups, groupFilter, loadingInProgress, loadingError} = this.state;

        return (
            <div>
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item>
                        <Typography>
                            Filter group list by name:
                        </Typography>
                    </Grid>
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
                    // Show the list of CustomerListEntry components
                    // Do not use strict comparison, since expandedCustomerID maybe a string if given from the URL parameters
                    filteredGroups.map(groups =>
                        <GroupListEntry key={groups.getID()} groups={groups}
                        />)
                }
                {/*{groups.map(groups => <GroupListEntry key={groups.getID()} groups={groups}/>)}*/}
                <LoadingProgress show={loadingInProgress} />
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

export default withStyles(styles)(GroupListForProfile);