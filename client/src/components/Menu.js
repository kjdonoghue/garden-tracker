import React from "react"
import {NavLink} from "react-router-dom";
import {connect} from "react-redux"
import './css/menu.css'

function Menu(props) {
  return (
    <div className="menuContainer">
      <b><NavLink to = "/" className="links">Home </NavLink> </b>
      <b><NavLink to = "/guides" className="links">Guides </NavLink></b>
      <b><NavLink to = "/garden" className="links">Garden </NavLink></b>
      <b><NavLink to = "/tasks" className="links">Tasks </NavLink></b>
      <b>{!props.isAuth ? <NavLink to = "/login" className="links">Login</NavLink> :null}</b>
      <b>{!props.isAuth ?<NavLink to = "/register" className="links">Register</NavLink> :null}</b>
      <b>{props.isAuth ? <NavLink to = "/logout" className="links">Logout</NavLink> :null}</b>
      <b><NavLink to = "/zone" className="links">Zone: {props.displayZone}</NavLink></b>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
  isAuth: state.isAuth,
  displayZone: state.zone
  }
}

export default connect(mapStateToProps)(Menu)