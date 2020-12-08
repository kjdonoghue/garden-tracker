import React from "react"
import {NavLink} from "react-router-dom";
import {connect} from "react-redux"

function Menu(props) {
  return (
    <div className="MenuContainer">
      <h1>Menu</h1>
            <b><NavLink to = "/">Home </NavLink> </b>
            <b><NavLink to = "/guides">Guides </NavLink></b>
            {/* Calculators is a stretch goal  */}
            <b>Calculators</b>
            {/* Dashboard is a stretch goal  */}
            <b><NavLink to = "/dashboard">Dashboard </NavLink></b>        
            <b><NavLink to = "/garden">Garden </NavLink></b>
            <b><NavLink to = "/tasks">Tasks </NavLink></b>
            <b>Account</b>
            {!props.isAuth ?<b><NavLink to = "/login">Login</NavLink></b> :null}
            {props.isAuth ?<b><NavLink to = "/logout">Logout</NavLink></b> :null}
            <b>Zone: {props.loadZone} <NavLink to = "/zone">change</NavLink></b>

    </div>
  )
}

export default Menu