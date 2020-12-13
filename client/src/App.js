
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import greenhouse from './components/images/greenhouse.png'
import {NavLink} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function App() {
  const classes = useStyles();


  return (
    <div className="App">
      <div className="appContainer">
        <div className="imageContainer">
          <img src={greenhouse} alt="greenhouse" className="image" />
        </div>
        <div className="textContainer">
          <h2>Headline here</h2>
          <p>lots of copy here</p>
          <p> and here</p>
          <p>and here</p>
          <div className='buttonContainer'>
            <div className="buttonItem">
              <NavLink to='/register'><Button className="button" variant="contained" color="primary"> Sign Up </Button></NavLink>
            </div>
            <div className="buttonItem">
            <NavLink to='/login'><Button className="button" variant="contained" color="primary"> LogIn </Button></NavLink>
            </div>
            <div className="buttonItem">
            <NavLink to='/guides'><Button className="button" variant="contained" color="primary"> Go to the Guides </Button></NavLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
