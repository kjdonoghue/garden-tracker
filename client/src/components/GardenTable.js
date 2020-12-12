import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";


function GardenTable(props) {

    //sets plants for use in rows
    const [plants, setPlants] = useState([])

    //sets columns
    const column = [
        { field: 'id', hide: true },
        { field: 'plant_name', headerName: 'Vegetable' },
        { field: 'type', headerName: 'Started As' },
        { field: 'sow_date', headerName: 'Sow Date', description: 'The date you planted your seeds' },
        { field: 'planting_date', headerName: 'Planting Date', description: 'The date you planted the plant in the garden' },
        { field: 'first_harvest', headerName: 'First Harvest', description: 'The date of the first harvest' },
        { field: 'last_harvest', headerName: 'Last Harvest', description: 'The date of the last harvest' },
        { field: 'company', headerName: 'Company' },
        { field: 'notes', headerName: 'Notes' }]


    useEffect(() => {
        //gets plants in primary garden (in global state) updated when choose garden componet updates primary garden in redux
        fetchGarden(props.displayGarden)
    }, [props.displayGarden])


    //gets plants by garden id 
    const fetchGarden = (id) => {
        axios.get(`http://localhost:8080/garden/${id}`)
            .then(response => {
                setPlants(response.data)
            })
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/garden/delete-garden/${id}`)
        .then(response => {

            let success = response.data.success
    
            if (success) {
                props.updateGardenLists()
                setPlants([])
            } else {
              console.log("did not update")
            }
        })
    }

    return (

        <div>
            <h2>{props.displayGardenName}</h2> 
            <button onClick={() => handleDelete(props.displayGarden)}>Delete</button>
            
            
            <div>
                {props.displayGarden ? <b><NavLink to="/add-plant"><button>Add Plant</button></NavLink></b> : null}
            </div>
            <div style={{ height: 250, width: '100%' }}>
                <DataGrid
                    columns={column}
                    rows={plants}
                    onSelectionChange={(newSelection) => {
                        window.location.href = (`/plant/${newSelection.rowIds[0]}`)
                        // `/plant/${newSelection.rowIds[0]}`
                    }}
                />
            </div>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        // this is the garden id:
        displayGarden: state.primary_garden,

        //this is the garden name:
        displayGardenName: state.primary_garden_name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGardenLists: () => dispatch({type:'DELETE_GARDEN'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GardenTable)