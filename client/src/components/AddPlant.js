import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import axios from "axios";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';



//for material-ui select
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));


function AddPlant(props) {
  //for material ui select
  const classes = useStyles();

  const [newPlant, setNewPlant] = useState({})

  // add zone and garden id to plant info onload
  useEffect(() => {
    setNewPlant({
      ...newPlant,
      zone: props.displayZone,
      garden_id: props.displayGardenID,
      plant_name: ''
    })
  }, [])

  //update local state with information
  const handleOnChange = (e) => {
    setNewPlant({
      ...newPlant,
      [e.target.name]: e.target.value
    })
  }

  // handle change to sow date
  const handleSowChange = (date) => {
    date.setDate(date.getDate())
    console.log(date)
    setNewPlant({
      ...newPlant,
      sow_date: date
    })
  };

  // handle change to planting date
  const handlePlantingChange = (date) => {
    date.setDate(date.getDate())
    console.log(date)
    setNewPlant({
      ...newPlant,
      planting_date: date
    })
  };

  //save new plant to db
  const onSaveToGarden = (plant) => {
    if (newPlant.plant_name == '') {
      alert('You must enter a plant variety')
    } else {
      axios.post('http://localhost:8080/garden/save-new',
        {
          data: newPlant
        })
        .then(response => {

          let success = response.data.success

          if (success) {
            props.history.push('/garden')
          } else {
            console.log("did not update")
          }
        })
    }
  }

  return (
    <div>
      <p>Add Plant</p>
      <div>
        <TextField onChange={handleOnChange} name="plant_name" value={newPlant.plant_name} id="standard-search" label="Variety" type="text" />
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Family</InputLabel>
          <Select onChange={handleOnChange} labelId="demo-simple-select-label" id="demo-simple-select" name="plant_family" value={newPlant.plant_family} >
            <MenuItem value="beans">Beans</MenuItem>
            <MenuItem value="beets">Beets</MenuItem>
            <MenuItem value="broccoli">Broccoli</MenuItem>
            <MenuItem value="cabbage">Cabbage</MenuItem>
            <MenuItem value="carrots">Carrots</MenuItem>
            <MenuItem value="cauliflower">Cauliflower</MenuItem>
            <MenuItem value="celery">Celery</MenuItem>
            <MenuItem value="corn">Corn</MenuItem>
            <MenuItem value="cowpeas">Cowpeas</MenuItem>
            <MenuItem value="cucumbers">Cucumbers</MenuItem>
            <MenuItem value="eggplant">Eggplant</MenuItem>
            <MenuItem value="greens">Greens</MenuItem>
            <MenuItem value="leeks">Leeks</MenuItem>
            <MenuItem value="melons">Melons</MenuItem>
            <MenuItem value="okra">Okra</MenuItem>
            <MenuItem value="peanuts">Peanuts</MenuItem>
            <MenuItem value="peas">Peas</MenuItem>
            <MenuItem value="peppers">Peppers</MenuItem>
            <MenuItem value="potatoes">Potatoes</MenuItem>
            <MenuItem value="summer squash">Summer Squash</MenuItem>
            <MenuItem value="winter squash">Winter Squash</MenuItem>
            <MenuItem value="sweet potatoes">Sweet Potatoes</MenuItem>
            <MenuItem value="tomatoes">Tomatoes</MenuItem>
          </Select>
        </FormControl>
        <TextField onChange={handleOnChange} name="quantity" value={newPlant.quantity} id="standard-search" label="Quantity" type="text" />
        <TextField onChange={handleOnChange} name="company" id="standard-search" label="Company" type="text" value={newPlant.company} />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Start From</InputLabel>
          <Select onChange={handleOnChange} labelId="demo-simple-select-label" id="demo-simple-select" name="type" value={newPlant.type} >
            <MenuItem value="seed">Seed</MenuItem>
            <MenuItem value="plant">Plant</MenuItem>
            <MenuItem value="sets">Sets</MenuItem>
            <MenuItem value="slips">Slips</MenuItem>
          </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Sow Date"
              format="MM/dd/yyyy"
              name="sow_date"
              value={newPlant.sow_date}
              onChange={handleSowChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>


        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Plant Outside"
              format="MM/dd/yyyy"
              name="planting_date"
              value={newPlant.planting_date}
              onChange={handlePlantingChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <button onClick={() => onSaveToGarden(newPlant)}>Save</button>
      </div>
    </div>


  );
}

const mapStatesToProps = (state) => {
  return {
    displayZone: state.zone,
    displayGardenID: state.primary_garden
  }
}

export default connect(mapStatesToProps)(AddPlant)