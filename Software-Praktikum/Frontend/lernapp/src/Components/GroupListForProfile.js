import React, { Component } from 'react';
import { withStyles, ListItem } from '@material-ui/core';
import LernappAPI  from '../API/LernappAPI';
import GroupListEntry from './GroupListEntry';
import LoadingProgress from "./Dialog/LoadingProgress";


class GroupListForProfile extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            groups: [],
            currentUser : 6,
            filteredGroups: [],
            loadingInProgress: false,
            loadingError: null,
        };
    }
    /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */

    leaveGroup = groups => {
        const newGroupList = this.state.groups.filter(groupFromState => groupFromState.getID() !== groups.getID());
        this.setState({
          groups: newGroupList,
          filteredGroups:[...newGroupList]
        });
      }
    

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


    /** Renders the component */
    render() {
        const { groups, filteredGroups, loadingInProgress, loadingError} = this.state;

        return (
            <div>
                {
                    // Show the list of CustomerListEntry components
                    // Do not use strict comparison, since expandedCustomerID maybe a string if given from the URL parameters
                    filteredGroups.map(groups =>
                        <GroupListEntry key={groups.getID()} groups={groups} onLeaveGroup={this.leaveGroup}
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