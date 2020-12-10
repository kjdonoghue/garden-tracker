import React, { useState } from "react";
// import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import axios from "axios";


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


function AddTasks(props) {
    //for material ui select
    const classes = useStyles();

    const [task, setTask] = useState({})

     
    //update with information
    const handleOnChange = (e) => {
        setTask({...task,
          [e.target.name]: e.target.value
        })
    }

    const handleSetDate = (date) => {
        date.setDate(date.getDate())
        console.log(date)
        setTask({
          ...task,
            task_date: date
        })
      };

    const onSaveTasks= (task) => {
      axios.post('http://localhost:8080/tasks/add-task',
        {
          data: task
        })
        .then(response => {let success = response.data.success

          if (success) {
           
           console.log("Success") 
           setTask({
               task_name: '',
               task_description: ''      
            })
          } else {
              console.log("did not update")
              }
          })    
    }

    

      return (
        <div>
            <p>Add Task</p>
            <div>
            <TextField onChange={handleOnChange} name="task_name" value={task.task_name} id="standard-search" label="Task" type="text" />
            </div>
            <div>                 
            <TextField onChange={handleOnChange} name="task_description" value={task.task_description} id="standard-textarea" label="Description" placeholder="Description" multiline />
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
                    value={task.task_date}
                    onChange={handleSetDate}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />
                </Grid>
            </MuiPickersUtilsProvider>
            </div>
              <div>
                <button onClick={() => onSaveTasks(task)}>Save</button>
              </div>          
        </div>

        
    );
} 


export default AddTasks