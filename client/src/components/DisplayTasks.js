import { useState, useEffect } from "react"
import axios from "axios"

import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

function DisplayTasks(props) {
      //for material ui select
  const classes = useStyles();

    const [tasks, setTasks] = useState([])
    const [dates, setDates] = useState({start_date: new Date(), end_date: new Date('2021-04-07'), complete: false})
    
    useEffect(() => {
        fetchTasks()
    }, [])

    //change start date for search  
    const handleStartChange = (date) => {
        date.setDate(date.getDate())
        setDates({
          ...dates,
          start_date: date
        })
      };

    //change end date for search  
    const handleEndChange = (date) => {
        date.setDate(date.getDate())
        setDates({
          ...dates,
          end_date: date
        })
      };

    //change status from fasle(active) to true(completed)   
    const handleOnChange = (e) => {
        setDates({...dates,
            complete: e.target.value
        })

    }

    // fetch tasks from database based on user id(token), start date, end date, and status
    const fetchTasks = () => {
        axios.get('http://localhost:8080/tasks/display',
        {params: dates})
        .then(response => {
            setTasks(response.data)
        })
    }

    //delete task by id number
    const handleDelete = (id) => {
      console.log("delete fired")
      axios.delete(`http://localhost:8080/tasks/delete/${id}`)
      .then(response => {
        let success = response.data.success
        if (success) {
          fetchTasks()
        } else {
          console.log("did not update")
        }
      })

    }


    //change complete false to true in db
    const handleComplete = (id) => {
      
      axios.post(`http://localhost:8080/tasks/complete/${id}`)
      .then(response => {
        let success = response.data.success
        if (success) {
          fetchTasks()
        } else {
          console.log("did not update")
        }
      })

    }

    //create task display
    const taskItems = tasks.map(task => {
        return <div key={task.id}>
            {task.task_name}
            {task.task_description}
            {task.task_date}
            <button onClick={() => handleComplete(task.id)}>Complete</button>
            <a href={`/edit-tasks/${task.id}`} ><button>Edit</button></a>
            
            <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
    })
    
    return(
        <div>
        <h1> Tasks</h1>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start Date"
                    format="MM/dd/yyyy"
                    name="start_date"
                    value={dates.start_date}
                    onChange={handleStartChange}
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
                label="End Date"
                format="MM/dd/yyyy"
                name="end_date"
                value={dates.end_date}
                onChange={handleEndChange}
                KeyboardButtonProps={{
                'aria-label': 'change date',
                }}
            />
            </Grid>
        </MuiPickersUtilsProvider>    

        <FormControl className={classes.formControl}>            
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select onChange={handleOnChange} name="completed" value={tasks.completed} labelId="demo-simple-select-label" id="demo-simple-select"  >
                      <MenuItem value="false">Active</MenuItem>
                      <MenuItem value="true">Completed</MenuItem>              
                  </Select>
              </FormControl>


      <button onClick={() => fetchTasks()}>Search</button>
     
            {taskItems}
        </div>
    )
}

export default DisplayTasks