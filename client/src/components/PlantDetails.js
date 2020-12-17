import { useEffect, useState } from "react"
import axios from "axios"
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import './css/addPlant.css'
import Message from './Message'

function PlantDetails(props) {

  //plant information pulled from db and modified on page
  const [plantDetails, setPlantDetails] = useState([])

  //set error message if does not save properly
  const[message, setMessage] = useState()
  
  useEffect(() => {
    let id = props.match.params.id
    fetchPlantDetails(id)

  }, [props.match.params.id])

  //pulls plant information from db
  const fetchPlantDetails = (id) => {
    axios.get(`https://tranquil-taiga-06770.herokuapp.com/garden/plant/${id}`)
      .then(response => {
        setPlantDetails(response.data[0])
      })

  }

  const handleOnChange = (e) => {
    setPlantDetails({
      ...plantDetails,
      [e.target.name]: e.target.value
    })

  }

  // handle change to sow date
  const handleSowChange = (date) => {
    date.setDate(date.getDate())
    console.log(date)
    setPlantDetails({
      ...plantDetails,
      sow_date: date
    })
  };

  // handle change to planting date
  const handlePlantingChange = (date) => {
    date.setDate(date.getDate())
    console.log(date)
    setPlantDetails({
      ...plantDetails,
      planting_date: date
    })
  };

  // handle change to first harvest date
  const handleFirstHarvestChange = (date) => {
    date.setDate(date.getDate())
    setPlantDetails({
      ...plantDetails,
      first_harvest: date
    })
  };

  // handle change to last harvest date
  const handleLastHarvestChange = (date, e) => {
    date.setDate(date.getDate())
    setPlantDetails({
      ...plantDetails,
      last_harvest: date
    })
  };

  //save to db and nav back to garden pg
  const handleSave = () => {
    axios.post('https://tranquil-taiga-06770.herokuapp.com/garden/save-edit',
      {
        data: plantDetails
      })
      .then(response => {

        let success = response.data.success

        if (success) {
          props.history.push('/garden')
        } else {
          setMessage("An error has occurred, please try again")
        }
      })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <h2 className='editHeader'>EDIT</h2>
        <label className='addInput'> Plant: <TextField fullWidth onChange={handleOnChange} id="standard-search" value={plantDetails.plant_name} name="plant_name" type="text" /> </label>
        <label className='addInput'> Plant Family: <TextField fullWidth onChange={handleOnChange} id="standard-search" value={plantDetails.plant_family} name="plant_family" type="text" /> </label>
        <label className='addInput'>  Start From: <TextField fullWidth onChange={handleOnChange} id="standard-search" value={plantDetails.type} name="type" type="text" /> </label>
        <label className='addInput'> Quantity: <TextField fullWidth onChange={handleOnChange} id="standard-search" value={plantDetails.quantity} name="quantity" type="text" /> </label>
        <label className='addInput'>  Supplier: <TextField fullWidth onChange={handleOnChange} id="standard-search" value={plantDetails.company} name="company" type="text" /> </label>
        <label className='addInput'> Sow Date:
        
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                name="sow_date"
                value={plantDetails.sow_date}
                onChange={handleSowChange}
                margin="normal"
                id="date-picker-dialog"
                label=""
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </label>

        <label className='addInput'> Planting Date:
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                name="planting_date"
                value={plantDetails.planting_date}
                onChange={handlePlantingChange}
                margin="normal"
                id="date-picker-dialog"
                label=""
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </label>

        <label className='addInput'> First Harvest:
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                name="first_harvest"
                value={plantDetails.first_harvest}
                onChange={handleFirstHarvestChange}
                margin="normal"
                id="date-picker-dialog"
                label=""
                format="MM/dd/yyyy"          
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </label>

        <label className='addInput'> Last Harvest:
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                name="last_harvest"
                value={plantDetails.last_harvest}
                onChange={handleLastHarvestChange}
                margin="normal"
                id="date-picker-dialog"
                label=""
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </label>

        <label className='addInput'>   
        <TextField
          onChange={handleOnChange}
          value={plantDetails.notes}
          name="notes"
          id="outlined-multiline-static"
          label="Notes"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
          fullWidth
        />    
        </label>

        <div className='saveNewPlant'>   
          <Button fullWidth onClick={handleSave} variant="contained" color="primary" href="#contained-buttons" >
            Save
          </Button>
        </div>

        <Message message={message} />       
      
      </div>
    </Container>
  )
}

export default PlantDetails