import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Zone from './Zone'
import {connect} from 'react-redux'

//for material-ui select
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function Guides(props) {

    //for material ui select
    const classes = useStyles();
    
    const [plant, setPlant] = useState("1")
    const [guides, setGuides] = useState([])
    
    useEffect(() => {
        fetchGuide(plant)
    }, [plant])
 
    // need to get zone information
    const fetchGuide = (id) => {

        fetch(`http://localhost:8080/guides/${id}`)
        .then(response => response.json())
        .then(result => {
            setGuides(result)
        })
    }


    const guideItem = guides.map(guide => {
        return <div key={guide.id} className="guide"><b>{guide.vegetable}</b>
            <label><b>Days to Maturity:</b> {guide.days_maturity}</label>
            <label><b>Sow Time:</b> {guide.sow_time}</label>
            <label><b>Sun Requirements:</b> {guide.sun_req}</label>
            <label><b>Water Requirements:</b> {guide.water_req}" per week</label>
            <label><b>Spread:</b> {guide.spread}"</label>
            <label><b>Height:</b> {guide.height}"</label>
            <label><b>Sow Method:</b> {guide.sow_method}</label>
            </div>
    })

    
 

    const handleChange = (event) => {        
        setPlant(event.target.value)
    };

    return (
        <div>
            <h1>Growing Guides</h1>
            <div>
             <Zone/>         
            </div>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Vegetable</InputLabel>
                <Select onChange={handleChange} labelId="demo-simple-select-label" id="demo-simple-select" value={plant} >
                    <MenuItem value="1">Beans</MenuItem>
                    <MenuItem value="2">Beets</MenuItem>
                    <MenuItem value="3">Broccoli</MenuItem>
                    <MenuItem value="4">Cabbage</MenuItem>
                    <MenuItem value="5">Carrots</MenuItem>
                    <MenuItem value="6">Cauliflower</MenuItem>
                    <MenuItem value="7">Celery</MenuItem>
                    <MenuItem value="8">Corn</MenuItem>
                    <MenuItem value="9">Cowpeas</MenuItem>
                    <MenuItem value="10">Cucumbers</MenuItem>
                    <MenuItem value="11">Eggplant</MenuItem>
                    <MenuItem value="13">Greens</MenuItem>
                    <MenuItem value="14">Leeks</MenuItem>
                    <MenuItem value="15">Melons</MenuItem>
                    <MenuItem value="16">Okra</MenuItem>
                    <MenuItem value="19">Peanuts</MenuItem>
                    <MenuItem value="20">Peas</MenuItem>
                    <MenuItem value="21">Peppers</MenuItem>
                    <MenuItem value="22">Potatoes</MenuItem>
                    <MenuItem value="24">Summer Squash</MenuItem>
                    <MenuItem value="25">Winter Squash</MenuItem>
                    <MenuItem value="26">Sweet Potatoes</MenuItem>
                    <MenuItem value="28">Tomatoes</MenuItem>        
                </Select>
            </FormControl>
        <div>        
            {guideItem}    
        </div>
    
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        isGuest: state.isGuest,
        zone: state.zone
    }
}


export default connect(mapStateToProps)(Guides)