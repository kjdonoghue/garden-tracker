import { useEffect, useState } from "react"
import axios from 'axios'

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
  

function EditTasks(props) {
    //for material ui select
    const classes = useStyles();

    const [details, setDetails] = useState([])
    let id = props.match.params.id


    useEffect(() => {
        // let id = props.match.params.id
        fetchTaskDetails(id)
    }, [])


       //update with information
       const handleOnChange = (e) => {
        setDetails({...details,
          [e.target.name]: e.target.value
        })
    }

    const handleSetDate = (date) => {
        date.setDate(date.getDate())
        console.log(date)
        setDetails({
          ...details,
            task_date: date
        })
      };

      //update db - need id #
      const onSaveTasks= (task) => {

        axios.post(`http://localhost:8080/tasks/update-task/${id}`,
          {
            data: task
          })
          .then(response => {let success = response.data.success
  
            if (success) {
             props.history.push('/tasks')
            } else {
                console.log("did not update")
                }
            })    
      }


    // get task details
    const fetchTaskDetails = (id) => {
        axios.get(`http://localhost:8080/tasks/edit-task/${id}`)
        .then(response => {
          setDetails(response.data[0])
        })
    }

    console.log(details)

    return(
        <div>
           <p>Edit</p>
           <div>
            <TextField onChange={handleOnChange} name="task_name" value={details.task_name} id="standard-search" label="" type="text" />
            </div>
            <div>                 
            <TextField onChange={handleOnChange} name="task_description" value={details.task_description} id="standard-textarea" label="" placeholder="Description" multiline />
            </div>
            <div>                  
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date"
                    format="MM/dd/yyyy"
                    name="task_date"
                    value={details.task_date}
                    onChange={handleSetDate}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />
                </Grid>
            </MuiPickersUtilsProvider>
            </div>
              <div>
                <button onClick={() => onSaveTasks(details)}>Save</button>
              </div>    
            
        </div>
    )
}

export default EditTasks