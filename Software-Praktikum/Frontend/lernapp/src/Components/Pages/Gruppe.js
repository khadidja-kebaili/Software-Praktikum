import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

class Gruppe extends Component {
    state = {  }
    render() { 
        return (<h1>Hello</h1>);


  function TabPanel(props) {
    const { children, value, index, ...other } = props;
          
      return (
        <Typography
            component="div"
              role="tabpanel"
              hidden={value !== index}
              id={`action-tabpanel-${index}`}
              aria-labelledby={`action-tab-${index}`}
                {...other}
              >
                {value === index && <Box p={3}>{children}</Box>}
              </Typography>
            );
          }
          
          TabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired,
          };
          
          function a11yProps(index) {
            return {
              id: `action-tab-${index}`,
              'aria-controls': `action-tabpanel-${index}`,
            };
          }
          
          const useStyles = makeStyles((theme) => ({
            root: {
              backgroundColor: theme.palette.background.paper,
              width: 500,
              position: 'relative',
              minHeight: 200,
            },
            fab: {
              position: 'absolute',
              bottom: theme.spacing(2),
              right: theme.spacing(2),
            },
            fabGreen: {
              color: theme.palette.common.white,
              backgroundColor: green[500],
              '&:hover': {
                backgroundColor: green[600],
              },
            },
          }));
          
           function FloatingActionButtonZoom() { //export default gelöscht
            const classes = useStyles();
            const theme = useTheme();
            const [value, setValue] = React.useState(0);
          
            const handleChange = (event, newValue) => {
              setValue(newValue);
            };
          
            const handleChangeIndex = (index) => {
              setValue(index);
            };
          
            const transitionDuration = {
              enter: theme.transitions.duration.enteringScreen,
              exit: theme.transitions.duration.leavingScreen,
            };
          
            const fabs = [
              {
                color: 'primary',
                className: classes.fab,
                icon: <AddIcon />,
                label: 'Add',
              },
              {
                color: 'secondary',
                className: classes.fab,
                icon: <EditIcon />,
                label: 'Edit',
              },
              {
                color: 'inherit',
                className: clsx(classes.fab, classes.fabGreen),
                icon: <UpIcon />,
                label: 'Expand',
              },
            ];
          
            return (
              <div className={classes.root}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="action tabs example"
                  >
                    <Tab label="Mitglieder" {...a11yProps(0)} />
                    <Tab label="Gruppenchat" {...a11yProps(1)} />
                    <Tab label="Kalender" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    Mitglieder
          
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    Chat 
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={theme.direction}>
                  <form className={classes.container} noValidate>
                    <TextField
                    id="Terminplaner"
                    label="Nächstes Treffen"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                     }}
                      /></form>
                  </TabPanel>
                
                {fabs.map((fab, index) => (
                  <Zoom
                    key={fab.color}
                    in={value === index}
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                  >
                    <Fab aria-label={fab.label} className={fab.className} color={fab.color}>
                      {fab.icon}
                    </Fab>
                  </Zoom>
                ))}
              </div>
            );
          }
          
    }
}
 
export default Gruppe;