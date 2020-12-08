import React from "react"
import {NavLink} from "react-router-dom";
import {connect} from "react-redux"

function Menu(props) {
  return (
    <div className="MenuContainer">
      <b><NavLink to = "/">Home </NavLink> </b>
      <b><NavLink to = "/guides">Guides </NavLink></b>
      <b><NavLink to = "/garden">Garden </NavLink></b>
      <b><NavLink to = "/tasks">Tasks </NavLink></b>
      {/* Account is a stretch goal  */}
      <b>Account</b>
      {!props.isAuth ?<b><NavLink to = "/login">Login</NavLink></b> :null}
      {!props.isAuth ?<b><NavLink to = "/register">Register</NavLink></b> :null}
      {props.isAuth ?<b><NavLink to = "/logout">Logout</NavLink></b> :null}
      {props.isAuth ?<b>Zone: {props.displayZone} <NavLink to = "/zone">change</NavLink></b>:null}
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