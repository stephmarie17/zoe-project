import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from '@reach/router';

require('./style.css');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));



export default function DenseAppBar() {
  const classes = useStyles();
  const logo = require('./ZOE-logo-navbar.png');
  // Need to remove user constant to replace with props 
  const user = "Mr. Purple Rain";
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
        <Link to="/"><img src={logo} alt="Learn Zoe"/></Link>

        <div className="profile">
        {/* Change user constant to props.username */}
        <p> Welcome {user} 
        <AccountCircleIcon className="profile-icon" fontSize="large"/> 
        <ArrowDropDownIcon 
        className="profile-icon" 
        id="logout-button"
        fontSize="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        /> 
         <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
              {/* Need to add logout functionality */}
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
        </p>
        </div>

        
        </Toolbar>
      </AppBar>
    </div>
  );
}