import React, { useState } from "react";
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
import Button from '@material-ui/core/Button';
import './css/addPlant.css'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline';
import Message from './Message'

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

  //plant object that will be sent to db
  const [newPlant, setNewPlant] = useState({garden_id: props.displayGardenID,
    plant_name: '', sow_date: null, planting_date: null })

  //set error message if user forgets plant name
  const[message, setMessage] = useState()

  
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
    
    setNewPlant({
      ...newPlant,
      sow_date: date
    })
  };

  // handle change to planting date
  const handlePlantingChange = (date) => {
    date.setDate(date.getDate())
    
    setNewPlant({
      ...newPlant,
      planting_date: date
    })
  };

  //save new plant to db
  const onSaveToGarden = (plant) => {
    if (newPlant.plant_name == '') {
      setMessage('You must enter a plant variety')
    } else {
      axios.post('https://tranquil-taiga-06770.herokuapp.com/garden/save-new',
        {
          data: newPlant
        })
        .then(response => {

          let success = response.data.success

          if (success) {
            props.history.push('/garden')
          } else {
            setMessage("There was an error, please try again")
          }
        })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
            <CssBaseline />
    <div className='addPlantContainer'>
      <h2>ADD A PLANT </h2>
      <div >
        <label className='addInput'>Variety: <TextField fullWidth onChange={handleOnChange} name="plant_name" value={newPlant.plant_name} id="standard-search" label="" type="text" /> </label>
      </div>
      <div>
      <label className='addInput'>Plant Family:<FormControl fullWidth className={classes.formControl}>
          <InputLabel id="demo-simple-select-label"></InputLabel>
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
        </label>
        </div>
        <div>
        <label className='addInput'>Quantity: <TextField fullWidth onChange={handleOnChange} name="quantity" value={newPlant.quantity} id="standard-search" label="" type="text" /> </label>
        </div>
        <div>
        <label className='addInput'>Company: <TextField fullWidth onChange={handleOnChange} name="company" id="standard-search" label="" type="text" value={newPlant.company} /> </label>
        </div>
        <div>
        <label className='addInput'>Start From: 
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select onChange={handleOnChange} labelId="demo-simple-select-label" id="demo-simple-select" name="type" value={newPlant.type} >
            <MenuItem value="seed">Seed</MenuItem>
            <MenuItem value="plant">Plant</MenuItem>
            <MenuItem value="sets">Sets</MenuItem>
            <MenuItem value="slips">Slips</MenuItem>
          </Select>
        </FormControl>
        </label>
        </div>
        <div>
        <label className='addInput'> 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        Sow Date:
          <Grid  container justify="space-around">
             <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label=""
              format="MM/dd/yyyy"
              name="sow_date"
              value={newPlant.sow_date}
              onChange={handleSowChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </Grid>
        </MuiPickersUtilsProvider>
        </label>
              </div>
              <div>
              <label className='addInput'>Planting Date: 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label=""
              format="MM/dd/yyyy"
              name="planting_date"            
              value={newPlant.planting_date}
              onChange={handlePlantingChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </Grid>
        </MuiPickersUtilsProvider>
        </label>
      </div>
      <div className='saveNewPlant'>
      <Button fullWidth onClick={() => onSaveToGarden(newPlant)} variant="contained" color="primary" href="#contained-buttons" >
        Save
      </Button>        
      </div>
      <Message message={message} />   
    </div>
    </Container>   

  );
}

const mapStatesToProps = (state) => {
  return {
    displayGardenID: state.gardenReducer.primary_garden
  }
}

export default connect(mapStatesToProps)(AddPlant)