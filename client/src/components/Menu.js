import React from "react"
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import './css/menu.css'
//for mobile menu
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Logout from "./Logout";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function NavMenu(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <div className="desktopMenu">
        <NavLink to="/" className="links">HOME </NavLink>
        <NavLink to="/guides" className="links">GUIDES </NavLink>
        <NavLink to="/zone" className="links">ZONE FINDER</NavLink>
        <NavLink to="/garden" className="links">GARDEN </NavLink>
        {!props.isAuth ? <NavLink to="/login" className="links">LOGIN</NavLink> : null}
        {!props.isAuth ? <NavLink to="/register" className="links">REGISTER</NavLink> : null}
        {props.isAuth ? <Logout /> : null}

      </div>

      <div className="mobileMenu">
        <div>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Hello Spring!
                </Typography>
                {!props.isAuth ? <NavLink to="/login" className="links"><Button color="inherit">Login</Button> </NavLink> : null}
                {props.isAuth ? <Button color="inherit"><Logout /></Button>  : null}
              </Toolbar>
            </AppBar>
          </div>

          {/* <div className="menuButtonContainer">
            {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Menu
            </Button> */}
          {/* </div> */} 
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><b><NavLink to="/" className="mobileLinks">Home </NavLink></b></MenuItem>
            <MenuItem onClick={handleClose}><b><NavLink to="/guides" className="mobileLinks">Guides </NavLink></b></MenuItem>
            <MenuItem onClick={handleClose}><b><NavLink to="/zone" className="mobileLinks">Zone Finder</NavLink></b></MenuItem>
            <MenuItem onClick={handleClose}><b><NavLink to="/garden" className="mobileLinks">Garden </NavLink></b></MenuItem>
            {!props.isAuth ? <MenuItem onClick={handleClose}><b><NavLink to="/login" className="mobileLinks">Login</NavLink></b></MenuItem> : null}
            {!props.isAuth ? <MenuItem onClick={handleClose}><b><NavLink to="/register" className="mobileLinks">Register</NavLink></b></MenuItem> : null}
            {props.isAuth ? <Logout /> : null}

          </Menu>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authenticatedReducer.isAuth,
  }
}

export default connect(mapStateToProps)(NavMenu)