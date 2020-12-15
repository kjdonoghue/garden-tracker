import { useState } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
// import * as actionTypes from '../store/actions/actionTypes'
import * as actionCreators from '../store/actions/actionCreators'
import Button from '@material-ui/core/Button';


function AddGarden(props) {
  
  const [name, setName] = useState({})

  const saveNewGarden = () => {
    if (name.garden_name == '') {
      alert("Please enter the name of your garden")
    } else {
      axios.post('https://tranquil-taiga-06770.herokuapp.com/garden/new-garden',
        {
          data: name
        })
        .then(response => {

          let success = response.data.success

          if (success) {
            //reload display gardens        
            props.updateDisplayGarden(name)      
            setName({
              ...name,
              garden_name: ''
            })
          } else {
            console.log("did not update")
          }
        })
    }
  }

  const handleOnChange = (e) => {
    setName({
      ...name,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>      
      <TextField onChange={handleOnChange} name="garden_name" value={name.garden_name} id="standard-search" label="Add a New Garden" type="text" />
      <Button onClick={saveNewGarden} size='small' variant="contained" color="primary" href="#contained-buttons" >
        Save
      </Button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateDisplayGarden: (name) => dispatch(actionCreators.updateDisplay(name))
  }

}


export default connect(null, mapDispatchToProps)(AddGarden)