import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const About=()=>{
    const a=useContext(noteContext);
    return(
        <h1>This is about {a.name} and he is {a.age} </h1>
    )


}
export default About;
