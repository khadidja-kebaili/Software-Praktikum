import React from 'react';
// import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Tabs, Tab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import {BrowserRouter as Router,
  Switch, Route, Link as RouterLink} from "react-router-dom";
import Matchmaker from "./Matchmaker";
import Profil from "./Profil";
import Chats from "./Chats";
import Gruppen from "./Gruppen";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      
      <div>
        
        <MenuIcon
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          // anchorOrigin={{
          //   vertical: 'top',
          //   horizontal: 'right',}}
          
          
          />
          
        <Typography variant='h4' margin='right'>
          LernApp
        </Typography>
        
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      
                      {/* <MenuItem onClick={handleClose}>
                      <Switch>
                      <Route path="/" onClick={() => handleMenuClick('./Profil')} exact component ={Profil}>Profil</Route>
                      </Switch> */}
                      {/* Profil */}
                    {/* </MenuItem> */}
                    <Router>
                    <MenuItem component={RouterLink} to={`/`} onClick={() => openInNewTab('./Profil')}>Profil</MenuItem>
                    <MenuItem component={RouterLink} to={`/`} onClick={() => openInNewTab('./Matchmaker')}>Matchmaker</MenuItem>
                    <MenuItem component={RouterLink} to={`/`} onClick={() => openInNewTab('./Chats')}>Chats</MenuItem>
                    <MenuItem component={RouterLink} to={`/`} onClick={() => openInNewTab('./Gruppen')}>Gruppen</MenuItem>
                    <MenuItem component={RouterLink} to={`/`} onClick={() => openInNewTab('./Matchmaker')} >Test</MenuItem>
                    </Router>
                  </MenuList>
                </ClickAwayListener>
                {/* <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} > */}
                {/* <Router>
                <Tab label='Matchmaker' component={Link} to={`/matchmaker`} />
                <Tab label='Profil' component={Link} to={`/profil`} />
                <Tab label='Chats' component={Link} to={`/chats`} />
                </Router> */}
             {/* </Tabs> */}
             <Router>
                <Switch>
                  <Route exact from="/matchmaker" render={props => <Matchmaker{...props}/>}/>
                  <Route exact path="/profil" render={props => <Profil{...props}/>}/>
                  <Route exact path="/chats" render={props => <Chats{...props}/>}/>
                  <Route exact path="/gruppen" render={props => <Gruppen{...props}/>}/>
                </Switch>
            </Router>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
