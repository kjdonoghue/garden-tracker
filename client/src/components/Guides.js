import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Zone from './Zone'
import './css/guides.css'
import axios from "axios";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

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
 
    //fetch plants from db based on plant id
    const fetchGuide = (id) => {
        axios.get(`http://localhost:8080/guides/${id}`)
        .then(response => {
            setGuides(response.data)
        })
    }

    //map through guides to set layout
    const guideItem = guides.map(guide => {
        return <div key={guide.id} className="guide">
            <div className='imgContainer'><img src={`./images/${guide.vegetable}.jpeg`}/></div>
            <h2>{guide.vegetable}</h2>
            <label className='description'>{guide.description}</label>    
            <label><b>Days to Maturity:</b> {guide.days_maturity}</label>
            <label><b>Sow Method:</b> {guide.sow_method}</label>
            <label><b>Sow Time:</b> {guide.sow_time}</label>
            <label><b>Plant Spacing:</b> {guide.seed_spacing}</label>
            <label><b>Spread:</b> {guide.spread}"</label>
            <label><b>Height:</b> {guide.height}"</label>
            <label><b>Sun Requirements:</b> {guide.sun_req}</label>
            <label><b>Water Requirements:</b> {guide.water_req}" per week</label>
            </div>
    })

    const handleChange = (event) => {        
        setPlant(event.target.value)
    };

    return (
        <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className='guideContainer'>
            <h1>GROWING GUIDES</h1>
            <div className='selectGuide'> 
                <label>Select a Guide: </label>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select onChange={handleChange} labelId="demo-simple-select-label" id="demo-simple-select" value={plant} >
                    <MenuItem value="1">Beans</MenuItem>
                    <MenuItem value="3">Broccoli</MenuItem>
                    <MenuItem value="5">Carrots</MenuItem>        
                    <MenuItem value="10">Cucumbers</MenuItem>                   
                    <MenuItem value="13">Greens</MenuItem>
                    <MenuItem value="15">Melons</MenuItem>                 
                    <MenuItem value="20">Peas</MenuItem>
                    <MenuItem value="21">Peppers</MenuItem>                    
                    <MenuItem value="28">Tomatoes</MenuItem>        
                </Select>
            </FormControl>
            </div>
        <div>        
            {guideItem}    
        </div>
        </div>
        </Container>
    )
}

export default Guides