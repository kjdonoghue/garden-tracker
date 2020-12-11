import axios from 'axios'
import {useEffect, useState} from 'react'
import {connect} from 'react-redux'


function DisplayGardenName(props) {

    // let garden_id = props.setGarden

    // useEffect(() => {
    //     displayGardenName(garden_id)
    // }, [props.setGarden])

    // const displayGardenName = (id) = {
    //     let id = id
        

    // }

    return(
        <div>
           <p>garden name</p>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
    setGarden: state.primary_garden
    }
}

export default connect(mapStateToProps)(DisplayGardenName)