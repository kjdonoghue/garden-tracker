import { useEffect, useState } from "react"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
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


function PlantDetails(props) {
    //for material ui select
   const classes = useStyles();

    const [plantDetails, setPlantDetails] = useState([])

    useEffect(()=> {
        let id = props.match.params.id
        fetchPlantDetails(id)

    }, [])

    const fetchPlantDetails = (id) => {
        axios.get(`http://localhost:8080/garden/plant/${id}`)
        .then(response => {
            setPlantDetails(response.data[0])
        })

    }

    const handleOnChange = (e) => {
        setPlantDetails({...plantDetails,
        [e.target.name]: e.target.value
        })

    }

    //   // handle change to planting date
      const handlePlantingChange = (date) => {
        date.setDate(date.getDate())
        console.log(date)
        setPlantDetails({...plantDetails,
            planting_date: date
        })
      };

      // handle change to first harvest date
      const handleFirstHarvestChange = (date) => {
        date.setDate(date.getDate())
        console.log(date)
        setPlantDetails({...plantDetails,
            first_harvest: date
        })
      };

      // handle change to last harvest date
      const handleLastHarvestChange = (date, e) => {
        date.setDate(date.getDate())
        console.log(date)
        setPlantDetails({...plantDetails,
            last_harvest: date
        })
      };

        const handleSave = () => {
            axios.post('http://localhost:8080/garden/save-edit', 
            {
                data: plantDetails
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

            console.log(plantDetails)

    return(
        <div>
            <p>Plant Details</p>
            
            <label> Plant: <TextField onChange={handleOnChange} id="standard-search" value={plantDetails.plant_name} name="plant_name" type="text" /> </label>
            <label> Plant Family: <TextField onChange={handleOnChange} id="standard-search" value={plantDetails.plant_family} name="plant_family" type="text" /> </label>
            <label> Start From: <TextField onChange={handleOnChange} id="standard-search" value={plantDetails.type} name="company" type="text" /> </label>
            <label> Supplier: <TextField onChange={handleOnChange} id="standard-search" value={plantDetails.company} name="company" type="text" /> </label>     
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Plant Outside"
                  format="MM/dd/yyyy"
                  name="planting_date"
                  value={plantDetails.planting_date}
                  onChange={handlePlantingChange}
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
                  label="First Harvest"
                  format="MM/dd/yyyy"
                  name="first_harvest"
                  value={plantDetails.first_harvest}
                  onChange={handleFirstHarvestChange}
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
                  label="Last Harvest"
                  format="MM/dd/yyyy"
                  name="last_harvest"
                  value={plantDetails.last_harvest}
                  onChange={handleLastHarvestChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />                    
              </Grid>
            </MuiPickersUtilsProvider>

            <label> Notes: <TextField onChange={handleOnChange} id="standard-search" value={plantDetails.notes} name="notes" type="text" /> </label>
    
            <button onClick={handleSave}>Save Changes</button>
            
            </div>
    )
}

export default PlantDetails