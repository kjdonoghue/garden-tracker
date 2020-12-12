import React from "react"
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import './css/menu.css'
//for mobile menu
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Logout from "./Logout";


function NavMenu(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <div className="menuContainer">
        <b><NavLink to="/" className="links">Home </NavLink> </b>
        <b><NavLink to="/guides" className="links">Guides </NavLink></b>
        <b><NavLink to="/garden" className="links">Garden </NavLink></b>
        <b>{!props.isAuth ? <NavLink to="/login" className="links">Login</NavLink> : null}</b>
        <b>{!props.isAuth ? <NavLink to="/register" className="links">Register</NavLink> : null}</b>
        <b>{props.isAuth ?  <Logout />  : null}</b>       
        <b><NavLink to="/zone" className="links">Zone: {props.displayZone}</NavLink></b>
      </div>

      <div className="mobileMenu">
      <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><b><NavLink to="/" className="mobileLinks">Home </NavLink></b></MenuItem>
        <MenuItem onClick={handleClose}><b><NavLink to="/guides" className="mobileLinks">Guides </NavLink></b></MenuItem>
        <MenuItem onClick={handleClose}><b><NavLink to="/garden" className="mobileLinks">Garden </NavLink></b></MenuItem>
        {!props.isAuth ? <MenuItem onClick={handleClose}><b><NavLink to="/login" className="mobileLinks">Login</NavLink></b></MenuItem> : null}
        {!props.isAuth ? <MenuItem onClick={handleClose}><b><NavLink to="/register" className="mobileLinks">Register</NavLink></b></MenuItem> : null}
        {props.isAuth ?  <Logout />  : null}
        <MenuItem onClick={handleClose}><b><NavLink to="/zone" className="mobileLinks">Zone: {props.displayZone}</NavLink></b></MenuItem>
      </Menu>
    </div>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authenticatedReducer.isAuth,
    displayZone: state.zoneReducer.zone
  }
}

export default connect(mapStateToProps)(NavMenu)