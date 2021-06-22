import React, { Component } from 'react';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LernappAPI  from '../API/LernappAPI';
import LoadingProgress from './Dialog/LoadingProgress';
import MemberListEntry from './MemberListEntry';


class MemberList extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      members: [],
      loadingInProgress: false,
    };
  }

  /** Fetches AccountBOs for the current customer */
  getMembers = () => {
    LernappAPI.getAPI().getMembersForGroup(this.props.groups.getID()).then(profileBOs =>
      this.setState({  // Set new state when AccountBOs have been fetched
        members: profileBOs,
        loadingInProgress: false, // loading indicator 
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          members: [],
          loadingInProgress: false,
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getMembers();
  }

  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    // reload accounts if shown state changed. Occures if the CustomerListEntrys ExpansionPanel was expanded
    // if ((this.props.show !== prevProps.show)) {
    //   this.getAccounts();
    // }
  }

//   /** Adds an account for the current customer */
//   addMember = () => {
//     LernappAPI.getAPI().addMemberForGroup(this.props.group.getID()).then( => {
//       // console.log(accountBO)
//       this.setState({  // Set new state when AccountBOs have been fetched
//         accounts: [...this.state.accounts, accountBO],
//         loadingInProgress: false, // loading indicator 
//         addingAccountError: null
//       })
//     }).catch(e =>
//       this.setState({ // Reset state with error from catch 
//         accounts: [],
//         loadingInProgress: false,
//         addingAccountError: e
//       })
//     );

//     // set loading to true
//     this.setState({
//       loadingInProgress: true,
//       addingAccountError: null
//     });
//   }


  /** Renders the component */
  render() {
    const { classes, groups } = this.props;
    // Use the states customer
    const { members, loadingInProgress} = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
        <List className={classes.accountList}>
          {
            members.map(members=> <MemberListEntry key={members.getID()} groups={groups} members={members}
               />)
          }
          <ListItem>
            <LoadingProgress show={loadingInProgress} />
          </ListItem>
        </List>
        {/* <Button className={classes.addAccountButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addAccount}>
          Add Member
        </Button> */}
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  accountList: {
    marginBottom: theme.spacing(2),
  },
  addAccountButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});


export default withStyles(styles)(MemberList);
