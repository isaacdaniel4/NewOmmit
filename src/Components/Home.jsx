import {signOut} from "firebase/auth";
import {database} from "./Firebase";
import {useNavigate} from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';



function Home() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const editNote = (index) => {
    const updatedNotes = [...notes];
    const updatedText = prompt('Edit Note:', notes[index]);
    if (updatedText !== null) {
      updatedNotes[index] = updatedText;
      setNotes(updatedNotes);
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };



   const history = useNavigate() 


const handleClick = () => {
  signOut(database).then(val=>{ 
    console.log(val, 'val')
    history('/')
  })
}



  return (
    <>
    <div className='grid justify-center text-center'>
    <h1 className='text-4xl font-bold mt-3'>home</h1>

    <div>
      <h1 className='text-2xl font-bold text-start mt-10 '>Notes</h1>
      <input className='p-4 border-2 border-blue-500 rounded-2xl'
        type="text"
        placeholder="Type your note here"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button className='ml-4 p-3 font-bold text-[17px] bg-blue-400' onClick={addNote}>Save</button>
      <ul className='mt-5 space-y-5'>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button className='ml-4 p-3 font-bold text-[17px] bg-blue-400'  onClick={() => editNote(index)}>Edit</button>
            <button className='ml-4 p-3 font-bold text-[17px] bg-blue-400' onClick={() => deleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>


    <button className='p-3 bg-slate-200 border-2 border-black mt-4 w-28' onClick={handleClick}>SignOut</button>
    </div>
    </>
  )
}


export default Home;