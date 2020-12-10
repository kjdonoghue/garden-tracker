import { useState, useEffect } from "react"
import axios from "axios"



function DisplayTasks(props) {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = () => {
        axios.get('http://localhost:8080/tasks/display')
        .then(response => {
            setTasks(response.data)
        })
    }


    return(
        <div>
        <h1> Tasks</h1>
            
        </div>
    )
}

export default DisplayTasks