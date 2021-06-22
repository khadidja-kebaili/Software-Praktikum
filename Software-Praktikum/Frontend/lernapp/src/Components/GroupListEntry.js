import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import GroupIcon from '@material-ui/icons/Group';
import {makeStyles} from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LernappAPI from "../API/LernappAPI";
import LoadingProgress from "./Dialog/LoadingProgress";
import LeaveGroup from './Dialog/LeaveGroup';
import MemberList from './MemberList';

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
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {groups.getDescription()}
                            <MemberList  groups={groups} />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
             <LeaveGroup show={this.state.showLeaveGroup} onClose={this.closeLeaveGroupDialog}/>   
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