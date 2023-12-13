import {signOut} from "firebase/auth";
import {database} from "./Firebase";
import {db} from "./Firebase";
import { useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import {collection, doc, getDoc, setDoc} from 'firebase/firestore'
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';



function Home() {
  
  const [title, setTitle] = useState('');
  const [note, setNote] = useState([]);
  // const [newNote, setNewNote] = useState('');
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);




  
  const notesRef = collection(db, "notes");
  const addEntry = async () => {
    if (title && note) {
      if (editingIndex !== null) {
        // If we are in editing mode, update the existing entry.
        const updatedEntries = [...entries];
        updatedEntries[editingIndex] = { title, note };
        setEntries(updatedEntries);
        setEditingIndex(null);
      } else {
        // If not in editing mode, add a new entry.
        setEntries([...entries, { title, note }]);
      }
      setTitle('');
      setNote('');
      const user = JSON.parse(localStorage.getItem('user'));

  const data = [...entries, {  title, note}];
  if (user && user.email) {
    await setDoc(doc(notesRef, user?.email), {
    notes: data,
  })
    }
  }
  
  }

  const editEntry = (index) => {
    const entry = entries[index];
    setTitle(entry.title);
    setNote(entry.note);
    setEditingIndex(index);
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    setEditingIndex(null);
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
    <div className="flex justify-between ">
    <button className="text-2xl fint-bold text-red-500 p-3"><Link to='/signOut'>&lt;Back</Link></button>
    <button className='p-3 bg-red-200 border-2 border-black mt-4 w-28 border-none rounded-xl' onClick={handleClick}>SignOut</button>
    </div>
    <div className='grid justify-center text-center'>
    <h1 className='text-4xl font-bold mt-3'>NOTE</h1>

    <div className="flex flex-col space-y-4 justify-center text-center sm:w-96">
      <h1 className='text-2xl font-bold text-start mt-10'>Add Note</h1>
      <input
      className="p-1 shadow-xl shadow-red-400 text-center font-bold text-xl animate-bounce"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
      className="border- border-x-2 border-red-500 h-40 rounded-xl p-3"
        placeholder="Type your note here"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={addEntry} className="shadow-xl py-2 shadow-red-300 mx-12 font-bold">
        {editingIndex !== null ? 'Save Edit' : 'Add'}
      </button>
      </div>
      </div>

    <div>
      <ul className='mt-5 space-y-7 grid sm:grid-cols-3 gap-16 ml-3 sm:w-[50%] text-start'>
        {entries.map((entry, index) => (
          <li key={index} >
            <div className='mt-20 font-bold flex flex-col bg-red-500 justify-center text-center'>
            <h2>{entry.title}</h2>
            <div className=' overflow-y-auto'>{entry.note}</div>
            </div>
            <div className="space-y-3 flex justify-between mt-4">
            <div className="text-red-500 font-bold text-xl p-3 w-40 h-14 mt-3"><button onClick={() => editEntry(index)}>Edit</button></div>
            <div className="text-red-500 font-bold text-xl p-4 w-40 text-end"><button onClick={() => deleteEntry(index)}>Delete</button></div>
            </div>
          </li>
          
        ))}
      </ul>
    </div>
    </>
  )
}


export default Home;