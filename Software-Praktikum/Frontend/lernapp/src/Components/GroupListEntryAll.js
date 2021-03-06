import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import LernappAPI from "../API/LernappAPI";
import RequestBO from './../API/RequestBO';

/**
 *
 * @author: Khadidja Kebaili
 * @coauthor: Esra Ö.
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
            showAddGroup: false,
            groupName: "",
            groupID: ""
        };
    }

    addGroupRequest = () => {
        let data = this.props.googleId
        let request_type = "G";
        let newRequest = new RequestBO(
            data,
            this.state.groups.getAdmin(),
            request_type,
            this.props.groups.getID()
        )
        LernappAPI.getAPI().addRequest(newRequest).then(console.log(newRequest))

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
                        <Button color='primary' onClick={this.addGroupRequest}>
                            Sende einen Request!
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {groups.getDescription()}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

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