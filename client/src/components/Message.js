import React from 'react';
import './css/message.css'


function Message(props) {

    let message = props.message

    return(
        <div className='message'>
                {message}
        </div>
    )

}

export default Message
