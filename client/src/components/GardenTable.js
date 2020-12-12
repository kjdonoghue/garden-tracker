import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import history from '.././utils/history'
import DeleteGarden from './DeleteGarden';
import SetPrimaryGarden from './SetPrimaryGarden';

function GardenTable(props) {

    //sets plants for use in rows
    const [plants, setPlants] = useState([])

    //sets columns
    const column = [
        { field: 'id', hide: true },
        { field: 'plant_name', headerName: 'Vegetable' },
        { field: 'quantity', headerName: 'Quantity' },
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
      
    return (

        <div>
            <h2>{props.displayGardenName}</h2> 
            {props.displayGarden ? <DeleteGarden id={props.displayGarden}/> : null}
            {props.displayGarden ? <SetPrimaryGarden id={props.displayGarden} name={props.displayGardenName}/> : null}
            <div>
                {props.displayGarden ? <b><NavLink to="/add-plant"><button>Add Plant</button></NavLink></b> : null}
            </div>
            <div style={{ height: 250, width: '100%' }}>
                <DataGrid
                    columns={column}
                    rows={plants}
                    onSelectionChange={(newSelection) => {
                        //history.push(`/detail/${newSelection.rowIds[0]}`)
                        window.location.href = (`/detail/${newSelection.rowIds[0]}`)
                       
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

export default connect(mapStateToProps)(GardenTable)