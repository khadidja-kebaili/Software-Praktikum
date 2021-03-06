import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import LeaveGroup from './Dialog/LeaveGroup';
import MemberList from "./MemberList.js"
import GroupEditDialog from './Dialog/GroupEditDialog';

/**
 *
 * @author: Khadidja Kebaili
 * @coauthor: Mihriban Dogan
 * @coauthor: Lena Tolmatschow
 */


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));


class GroupListEntry extends Component {

    constructor(props) {
        super(props);

        // Init an empty state
        this.state = {
            groups: props.groups,
            showLeaveGroup: false,
            showAddGroup: false,
            showGroupEditDialog: false,
        };
    }



     leaveGroupclicked = (event) => {
        event.stopPropagation();
        this.setState({
          showLeaveGroup: true
        });
      }
    
      closeLeaveGroupDialog = () => {
          this.setState({
          showLeaveGroup: false
        });
      }
    
    // addGroupRequest = () => {
     //    let request_type = "G"
     //    console.log(typeof(this.state.selectedMember))
       //  let newRequest = new RequestBO (
        //     this.state.selectedMember.getID(),
        //     this
       //  )
    // }

  editGroupButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
          showGroupEditDialog: true
        });
      }

  groupEditDialogClosed = (groups) => {
        // customer is not null and therefor changed
        if (groups) {
          this.setState({
            groups: groups,
            showGroupEditDialog: false
          });
        } else {
          this.setState({
            showGroupEditDialog: false
          });
        }
      }


  closeLeaveGroupDialog = (groups) => {
    // if customer is not null, delete it
    if (groups) {
      this.props.onLeaveGroup(groups);
    };

    // Don??t show the dialog
    this.setState({
      showLeaveGroup: false
    });
  }
    render() {
        const{groups}=this.state;

        return (
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>{groups.getGroupname()}</Typography>
                        <Button onClick={this.leaveGroupclicked} color='primary' >
                          Gruppe Verlassen
                        </Button>
                        <Button color='primary' onClick={this.editGroupButtonClicked}>
                           Gruppe bearbeiten
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {groups.getDescription()}
                            {<MemberList  groups={groups} />}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
             <LeaveGroup show={this.state.showLeaveGroup} groups={groups} googleId={this.props.googleId} onClose={this.closeLeaveGroupDialog}/>
             <GroupEditDialog show = {this.state.showGroupEditDialog} groups={groups} onClose={this.groupEditDialogClosed} />
             {/* Von Lena eingef??gt addGroupRequest
              <Button color='primary' startIcon={<AddIcon />} flex="flex-end" onClick={this.addGroupRequest}>Anfrage senden
             </Button>   */}

            </div>
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%'
    },
    buttonMargin: {
        marginRight: theme.spacing(2),
    },
    groupEntry: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    }
});

export default withStyles(styles)(GroupListEntry);