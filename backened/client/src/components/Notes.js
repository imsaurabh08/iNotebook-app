import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const {showalert}=props;
  const context = useContext(noteContext);
  const { notes, GetNotes, updateNote } = context;
  const [note, setnotes] = useState({ id: "", etitle: '', edescription: "", etag: "" })
const navigate=useNavigate()
  const ref = useRef(null);
  const refclose = useRef(null);
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      navigate('/login')
    }
    else
    {
      console.log(localStorage.getItem('token'));
      GetNotes()

    }
    // eslint-disable-next-line
  },[])
  const updatenote = (currentnote) => {
    ref.current.click();
    setnotes({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })

  }
  const onChange = (e) => {
    setnotes({ ...note, [e.target.name]: e.target.value })
  }
  const handleClick = (e) => {
    console.log("Updating the note", note)
    e.preventDefault();
    refclose.current.click();
    updateNote(note.id, note.etitle, note.edescription, note.etag)
showalert("Updated successfully","success");

  }
  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Your Notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" onChange={onChange} value={note.edescription} name='edescription' />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
                <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                <button type="submit" disabled={note.edescription.length<8  || note.etitle.length<3} className="btn btn-primary mx-2" onClick={handleClick}>Submit</button>
              </form>
            </div>

          </div>
        </div>
      </div>


      <div className='row my-3'>
        {
         
      !notes.length ?  <div className="container mx-2" >No notes to display</div> :    notes.map((note) => {
            return <Noteitem key={note._id} updatenote={updatenote} note={note} showalert={showalert}  />;
          })
        }
      </div>
    </>
  )
}

export default Notes