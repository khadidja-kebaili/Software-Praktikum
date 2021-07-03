import React, { Component } from 'react';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LernappAPI from "../API/LernappAPI";
import LoadingProgress from './Dialog/LoadingProgress';
import MemberListEntry from './MemberListEntry';
import AddMember from './Dialog/AddMember';
import ChataccessBO from '../API/ChataccessBO'

/**
 * @author [Mihriban Dogan](https://github.com/mihriban-dogan)
 */

class MemberList extends Component {

  constructor(props) {
    super(props);

    // Der State wird initialisiert mit der Memberliste, dem target und selectedMember
    this.state = {
      members: [],
      loadingInProgress: false,
      showAddMember: false,
      memberName: '',
      targetMember: [],
      selectedMember: null,
    };
  }

  /** Fetched die MemberBOs */
  getMembers = () => {
    LernappAPI.getAPI().getMembersForGroup(this.props.groups.getID()).then(profileBOs =>
      this.setState({  // State wird gesetzt wenn die Members gefetched wurden
        members: profileBOs,
        loadingInProgress: false, // Ladebalken
      })).catch(e =>
        this.setState({ // State auf initial wert setzen bei Fehler
          members: [],
          loadingInProgress: false,
        })
      );
    this.setState({
      loadingInProgress: true,
    });
  }

   /** Suche nach einem Member mithilfe des Nachnamenm, wird bei AddMember Dialog aufgerufen */
   searchMember = async () => {
    const { memberName } = this.state;
    if (memberName.length > 0) {
      try {
        // Member laden
        const member = await LernappAPI.getAPI().searchMember(memberName);

        let selectedMember = null;

        if (member.length > 0) {
          selectedMember = member[0];
        }
        // Setzen des finalen states
        this.setState({
          targetMember: member,
          selectedMember: selectedMember,
        });
      } catch (e) {
        this.setState({
          targetMember: [],              // Bei Fehler wieder auf initalwert setzen
          selectedMember: null,
        });
      }
    }
  }

   /** Behandeln des selektieren von Member beim Select Textfeld, wird bei AddMember Dialog aufgerufen */
 memberSelectionChange = (event) => {
  this.setState({
    selectedMember: event.target.value,
  });
}
  /** Behandelt die Eingabe des Suchtextfeldes, wird bei AddMember Dialog aufgerufen */
  textFieldValueChange = (event) => {
    const val = event.target.value;
    this.setState({
      [event.target.id]: val
    });
  }

  //Hinzufügen eines Members --> es wird ein Chataccess für diesen Member erstellt 
  addMember = () => {
    let chattype = "G"
      let newChataccess = new ChataccessBO(
        this.state.selectedMember.getID(),
        this.props.groups.getID(),
        chattype
      )
      LernappAPI.getAPI().addMember(newChataccess).then(this.closeAddMemberDialog)
    } 

  componentDidMount() {
    this.getMembers();
  }

  //Aufruf, wenn der AddMember Button geklickt wurde, vom AddMemberDialog
    addMemberButtonclicked = (event) => {
      event.stopPropagation();
      this.setState({
        showAddMember: true
      });
    }

    //Schließen des Dialogs, onclose von AddMember Dialog
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

 
  render() {
    const { classes, groups } = this.props;
    const { members, loadingInProgress} = this.state;

    return (
      <div className={classes.root}>
        <List className={classes.accountList}>
          { // Einzelne Member als Props weitergeben
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

/** Komponente CSS */
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