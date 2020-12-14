import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function Message(props) {
    const classes = useStyles();

    let message = props.message

    return(
        <div>
                {message}
        </div>
    )

}

export default Message
