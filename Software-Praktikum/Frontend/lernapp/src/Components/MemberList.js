import React, { Component } from 'react';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LernappAPI  from '../API/LernappAPI';
import LoadingProgress from './Dialog/LoadingProgress';
import MemberListEntry from './MemberListEntry';
import AddMember from './Dialog/AddMember';
import ChataccessBO from '../API/ChataccessBO'


class MemberList extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      members: [],
      loadingInProgress: false,
      showAddMember: false,
      memberName: '',
      targetMember: [],
      selectedMember: null,
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

   /** Searches for members with a memberName and loads the corresponding accounts */
   searchMember = async () => {
    const { memberName } = this.state;
    if (memberName.length > 0) {
      try {
        // Load members first
        const member = await LernappAPI.getAPI().searchMember(memberName);

        let selectedMember = null;

        if (member.length > 0) {
          selectedMember = member[0];
        }
        // Set the final state
        this.setState({
          targetMember: member,
          selectedMember: selectedMember,
        });
      } catch (e) {
        this.setState({
          targetMember: [],              // Set empty array
          selectedMember: null,
        });
        console.log(this.state.targetMember)
      }
    }
  }

   /** Handles value changes of the member select textfield */
 memberSelectionChange = (event) => {
  this.setState({
    selectedMember: event.target.value,
  });
}
  /** Handles value changes of the forms textfields and validates the transferAmout field */
  textFieldValueChange = (event) => {
    const val = event.target.value;
    this.setState({
      [event.target.id]: val
    });
  }

  
  addMember = () => {
    let chattype = "g"
      let newChataccess = new ChataccessBO(
        this.state.selectedMember.getID(),
        this.props.groups.getID(),
        chattype
      )
      LernappAPI.getAPI().addMember(newChataccess).then(console.log(newChataccess)).then(this.closeAddMemberDialog)
    } 

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getMembers();
  }

    addMemberButtonclicked = (event) => {
      event.stopPropagation();
      this.setState({
        showAddMember: true
      });
    }

    closeAddMemberDialog = (addmember) => {
        this.setState({
        showAddMember: false
      });
      if (addmember) {
        //Mitglied wurde hinzugefügt also lade die Members erneut, sodass der neue Member angezeigt wird
        this.getMembers();
        this.setState({
          memberName: '',
          targetMember: [],
          selectedMember: null,
        })
      }
    }

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
        <Button className={classes.addMemberButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addMemberButtonclicked}>
          Add Member
        </Button>
        <AddMember show={this.state.showAddMember} groups={groups} 
        addMember={this.addMember} textFieldValueChange={this.textFieldValueChange} 
        searchMember={this.searchMember} memberSelectionChange={this.memberSelectionChange}
        memberName={this.state.memberName} targetMember={this.state.targetMember} selectedMember={this.state.selectedMember}
        onClose={this.closeAddMemberDialog}/>
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
  addMemberButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});


export default withStyles(styles)(MemberList);