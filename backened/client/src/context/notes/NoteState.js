import React, { useState } from "react";
import noteContext from "./noteContext";
// import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialNote = [];
    const [notes, setNotes] = useState(initialNote);
 
    const GetNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

        });

        const json = await response.json()
        console.log(json)
        setNotes(json);
    }

    // Add a note
    const addNote = async (title, description, tag) => {


        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header


        });
        const note = await response.json();

        setNotes(notes.concat(note));
    }


    //Delete a note
    const deleteNote = async (id) => {

        //api call
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },


        });

console.log(response);
        console.log("Delete note with id" + id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
        // GetNotes();
    }

    //Update a note
    const updateNote = async (id, title, description, tag) => {
        //api call


        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')


            },

            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
console.log(response);

        // return response.json(); // parses JSON response into native JavaScript objects



const newNotes=JSON.parse(JSON.stringify(notes));
        //logic to edit at client end
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }
    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, GetNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;