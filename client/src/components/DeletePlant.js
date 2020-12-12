
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'


//for material ui
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function DeletePlant(props) {
    //for material ui
    const classes = useStyles();

    const handleDelete = (id) => {
        
        axios.delete(`http://localhost:8080/garden/delete-plant/${id}`)
          .then(response => {
    
            let success = response.data.success
    
            if (success) {
            //   props.history.push('/garden')
            window.location.href = (`/garden`)
            } else {
              console.log("did not update")
            }
          })
      }

  

    return(
        <div>
            {/* <button onClick={() => handleDelete(props.displayGarden)}>Delete</button> */}
            <div className={classes.root}>
            <IconButton aria-label="delete">
                <DeleteIcon onClick={() => handleDelete(props.id)}/>
            </IconButton>
    </div>
        </div>
    )

}



export default DeletePlant