import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";
const Home = (props) => {
  const {showalert}=props;
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnotes] = useState({ title: '', description: "", tag: "" })

  const onChange = (e) => {
    setnotes({ ...note, [e.target.name]: e.target.value })
  }
  const handleClick = (e) => {
    e.preventDefault();
    
    addNote(note.title, note.description, note.tag);
    setnotes({ title: '', description: "", tag: "" })
 showalert("Notes added successfully","success");
  }
  return (
    <div>
      <div>
        <div className="container my-3">
          <h2>Add Notes</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} />

            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" name='description'value={note.description} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
            </div>

            <button type="submit"  disabled={note.description.length<8  || note.title.length<3} className="btn btn-primary" onClick={handleClick} >Submit</button>
          </form>
        </div>
      </div>
      <div className="container my-3">
        <h2>Your Note</h2>
        <Notes showalert={showalert} />
      </div>
    </div>
  )
}
export default Home;