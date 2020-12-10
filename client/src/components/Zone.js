import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

function FindZone(props) {

   const [zip, setZip] = useState()
   const [zone, setZone] = useState([])

   useEffect(() => {
      fetchZoneInformation(props.setZone)

   }, [props.setZone])


   //get zone info based on zone id
   const fetchZoneInformation = (id) => {
     fetch(`http://localhost:8080/guides/zone-information/${id}`)
     .then(response => response.json())
     .then(result => {
       setZone(result)
     })
   }

   console.log(zone)

    //handle on change for entering zip code to get zone
    const handleOnChange = (e) => {
        return (
            setZip({
                zip: e.target.value
            })
        )
    } 

    //handle the save to get the zone number based on zip
    const handleOnClick = (zip) => {
        fetch(`https://phzmapi.org/${zip}.json`)
        .then(response => response.json())
        .then(result => {
            props.updateZone(result.zone)
        })
      }

    //handle change to have option to update zone
    const handleOnChangeGuest = () => {
        props.notGuest()
    }

    //maps through zone db information
    let ZoneItem = zone.map(zone => {
      return <div>
        <label>Last Frost: {zone.last_front}</label>
        <label>First Frost: {zone.first_front}</label>
        <label>Low Temp Range: Need to update this in db</label>
        </div>
    })
    
  return (
    <div className="ZoneContainer">
      {!props.isGuest ? <div>
      <h3>Find Your Growing Zone</h3>
      <p>Enter your zip code to see detailed information about your growing zone</p>
      <input type="text" placeholder="Enter Zip Code" name="zone" onChange={handleOnChange} />
      <button onClick={() => handleOnClick(zip.zip)}>Submit</button>
      </div> : null }
      
      {props.isGuest ? <div>
      <p>Your Zone is: {props.setZone} </p>
      {ZoneItem}

        <button onClick={handleOnChangeGuest}>Change Zones</button>
      </div> : null}

    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    setZone: state.zone,
    isGuest: state.isGuest
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateZone: (zone) => dispatch({type: 'SET_ZONE', payload: zone}),
    notGuest: () => dispatch({type: 'NOT_GUEST'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindZone)