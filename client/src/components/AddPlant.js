import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';


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


function AddPlant() {
   //for material ui select
   const classes = useStyles();

  const [plantName, setPlantName] = useState()
  const [plantFamily, setPlantFamily] = useState()
  const [sowDate, setSowDate] = useState(new Date('2021-04-07'));
  //put lastfrost date in here

  //calc sow date by veg family or send last frost through and calc on server
  const handleDateChange = (date) => {
    date.setDate(date.getDate() + 50)
    console.log(date)
    setSowDate(date);
  };

  const handleSelectFamily = (event) => {        
    setPlantFamily(event.target.value)
  };

  const handlePlantName = (e) => {
    setPlantName(e.target.value)
  }

  const onSaveToGarden = (id, name, family, sow_date) =>{
    console.log(id)
    console.log(name)
    console.log(family)
    console.log(sow_date)
    fetch("url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"},
      body: JSON.stringify({
        garden_id: id,
        name: name,
        family: family,
        sow_date: sow_date

      })
  })
  }


    return (
      <div>
          <p>Add Plant</p>
          <div>
          <TextField onChange={handlePlantName} id="standard-search" label="Plant Name" type="text" />
          </div>
          <div>
          <FormControl className={classes.formControl}>            
                <InputLabel id="demo-simple-select-label">Family</InputLabel>
                <Select onChange={handleSelectFamily} labelId="demo-simple-select-label" id="demo-simple-select" value={plantFamily} >
                    <MenuItem value={1}>Beans</MenuItem>
                    <MenuItem value={2}>Beets</MenuItem>
                    <MenuItem value={3}>Broccoli</MenuItem>
                    <MenuItem value={4}>Cabbage</MenuItem>
                    <MenuItem value={5}>Carrots</MenuItem>
                    <MenuItem value={6}>Cauliflower</MenuItem>
                    <MenuItem value={7}>Celery</MenuItem>
                    <MenuItem value={8}>Corn</MenuItem>
                    <MenuItem value={9}>Cowpeas</MenuItem>
                    <MenuItem value={10}>Cucumbers</MenuItem>
                    <MenuItem value={11}>Eggplant</MenuItem>
                    <MenuItem value={13}>Greens</MenuItem>
                    <MenuItem value={14}>Leeks</MenuItem>
                    <MenuItem value={15}>Melons</MenuItem>
                    <MenuItem value={16}>Okra</MenuItem>
                    <MenuItem value={19}>Peanuts</MenuItem>
                    <MenuItem value={20}>Peas</MenuItem>
                    <MenuItem value={21}>Peppers</MenuItem>
                    <MenuItem value={22}>Potatoes</MenuItem>
                    <MenuItem value={24}>Summer Squash</MenuItem>
                    <MenuItem value={25}>Winter Squash</MenuItem>
                    <MenuItem value={26}>Sweet Potatoes</MenuItem>
                    <MenuItem value={28}>Tomatoes</MenuItem>        
                </Select>
            </FormControl>
            </div>
            <div>
              <button onClick={() => onSaveToGarden(1, plantName, plantFamily, sowDate)}>Save</button>
            </div>
            {/* <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Sow Seeds"
                  format="MM/dd/yyyy"
                  value={sowDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />                    
              </Grid>
            </MuiPickersUtilsProvider>
            </div> */}
          {/* input a plant name
          select the plant family
          get the information from the plant family
          get last frost date from zone
          post to the server
            garden # - props
            plant variety name - user input
            plant family - select from drop down
            last frost date - from zone - global state
            sow_days - from plant family - maybe hardcode? */}


      </div>

      
    );
} 

export default AddPlant