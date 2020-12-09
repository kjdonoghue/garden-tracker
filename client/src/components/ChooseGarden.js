import {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

function ChooseGarden(props) {

    const [garden, setGarden] = useState()

    useEffect(() => {
        fetchUserGardenDefaults()
    })

    const fetchUserGardenDefaults = () => {
        axios.get('http://localhost:8080/garden/defaults')
        .then(response => {
            console.log(response.data[0].zone)
        })
    }


    //pull primary garden id & zone when open the page
    // share both of these with global
    //pull garden information
    //display primary garden name
    //show other gardens by name (value=garden id) in drop down 
    //option to change gardens - if change this needs to update the global state but not account info


    return (
        <div>
           <p>choose garden</p> 

           
        </div>
    )
}

const mapStatesToProps = (state) => {
    return {
        onSetGardenDefault: state.primary_garden,
        onSetZoneDefault: state.zone

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(ChooseGarden)