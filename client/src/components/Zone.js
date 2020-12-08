import React, {useState} from "react"
import {connect} from "react-redux"

function FindZone(props) {

   const [zip, setZip] = useState()
   const [zone, setZone] = useState([])

    const handleOnChange = (e) => {
        return (
            setZip({
                zip: e.target.value
            })
        )
    } 

    const handleOnClick = (zip) => {
        fetch(`https://phzmapi.org/${zip}.json`)
        .then(response => response.json())
        // .then(result => props.onUpdateZone(result))
        .then(result => {
            setZone(result.zone)
        })
      }

      console.log(zone)
    
  return (
    <div className="ZoneContainer">
      <div>
      <h1>Find Your Growing Zone</h1>
      <input type="text" placeholder="Enter Zip Code" name="zone" onChange={handleOnChange} />
      <button onClick={() => handleOnClick(zip.zip)}>Submit</button>
      </div>
      <div>
          <p>Your Zone is: {zone} </p>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     zoneInformation: state.growingZone
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onUpdateZone: (zone) => dispatch({type: "ON_UPDATE_ZONE", payload: zone})
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FindZone);

export default FindZone