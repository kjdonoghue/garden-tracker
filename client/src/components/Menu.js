import React from "react"
import {NavLink} from "react-router-dom";
import {connect} from "react-redux"

function Menu(props) {
  return (
    <div className="MenuContainer">
      <b><NavLink to = "/">Home </NavLink> </b>
      <b><NavLink to = "/guides">Guides </NavLink></b>
      {/* Calculators is a stretch goal  */}      
      <b><NavLink to = "/calculators">Calculators </NavLink></b>    
      <b><NavLink to = "/garden">Garden </NavLink></b>
      <b><NavLink to = "/tasks">Tasks </NavLink></b>
      {/* Account is a stretch goal  */}
      <b>Account</b>
      {!props.isAuth ?<b><NavLink to = "/login">Login</NavLink></b> :null}
      {props.isAuth ?<b><NavLink to = "/logout">Logout</NavLink></b> :null}
      <b>Zone: {props.loadZone} <NavLink to = "/zone">change</NavLink></b>
    </div>
  )
}

export default Menu