import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton, InputAdornment, TextField,  Paper , Grid} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { ElectivAPI } from '../api';
import ClearIcon from '@material-ui/icons/Clear';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';
import GroupEntry from '/GroupEntry';
import GroupForm from '/GroupForm';




//Die Suche und das Filtern der Gruppe 

class GroupListe extends Component {

  constructor(props) {
    super(props);

    //gebe einen leeren status
    this.state = {
        Group: [],
        filteredGroup: [],
        GroupFilter: '',
        showGroupForm: false,
        error: null,
        loadingInProgress: false,
    };
  }

  //Suche-Funktion zum Suchen von Gruppen
  filterFieldValueChange= event => {
    const value = event.target.value.toLowerCase();
    this.setState({
        filteredGroup: this.state.Group.filter(Group=> {
            let nameContainsValue = Group.getid().toLowerCase().includes(value);
            return nameContainsValue;
        }),
        GroupFilter: value
    });
}

//Suche leeren
clearFilterFieldButtonClicked = () => {
    this.setState({
        filteredGroup: [...this.state.Group],
        GroupFilter: ''
    });
}

//wird aufgerufen, wenn Dialog Fenster geschloßen wird
GroupFormClosed = Group => {
    if (Group) {
      const newGroupList = [...this.state.Group, Group];
      this.setState({
        Group: newGroupList,
        filteredGroup: [...newGroupList],
        showGroupForm: false
      });
    } else {
      this.setState({
        showGroupForm: false
      });
    }
  }

  // API Anbindung um alle Module vom Backend zu bekommen 
  getGroup = () => {
    ElectivAPI.getAPI().getGroup()
    .then(GroupBO =>
        this.setState({
            Group: GroupBO,
            filteredGroup: [...GroupBO],
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                Group: [],
                filteredGroup: [],
                error: e,
                loadingInProgress: false,
            }));
    this.setState({
        error: null,
        loadingInProgress: true,
    });
}


  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
      this.getGroup();
  }
  

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const {  loadingInProgress, error, GroupFilter, filteredGroup, showGroupForm} = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center">
            <Grid item >
            <TextField
                className={classes.filter}
                type='text'
                label='Gruppe suchen'
                value={GroupFilter}
                onChange={this.filterFieldValueChange}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>
                    <IconButton onClick={this.clearFilterFieldButtonClicked}>
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                    </InputAdornment>,
                }}
            />
            </Grid>    
        </Grid>
        <Paper>
            <List className={classes.root} dense>
                {
                filteredGroup.map(Group => 
                    <GroupEntry key={Group.getID()} Group = {Group} show={this.props.show} getGroup={this.getGroup}/>)
                }
            </List>
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={error} contextErrorMsg={`Die Gruppe konnten nicht geladen werden.`} onReload={this.getGroup} />
        </Paper>
        <GroupForm show={showGroupForm} onClose={this.GroupFormClosed} getGroup= {this.getGroup}/>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(GroupList));