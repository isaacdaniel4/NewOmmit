import {database} from "./Firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';



function GetStarted() {


  const [login, setLogin] = useState(false)

  const history = useNavigate()

  
  const handleSubmit =(e, type) => {
    e.preventDefault()
   const email = e.target.email.value
   const password = e.target.password.value

   if(type == 'signup') {
   createUserWithEmailAndPassword(database,email,password).then(data=> {
    console.log(data,"authData")
    history('/signOut')
  })
   }else{
    signInWithEmailAndPassword(database,email,password).then(data=> {
      console.log(data,"authData")
      localStorage.setItem("user", JSON.stringify({}))
      history('/signOut')
    }).catch (err=>{
      alert(err.code)
      setLogin(true)
    })

   }
  }
  return (
    <>
    <div className='text-center flex justify-center cover'>
    <div className="p-10 backdrop:backdrop-filter-2xl space-y-5">
      <div className='flex flex-row justify-between text-2xl font-bold cursor-pointer'>
        <div className={login == false?'activeColour':'pointer'} onClick={() => setLogin(false)}>SignUp</div>
        <div className={login == true?'activeColour':'pointer'} onClick={() => setLogin(true)}>SignIn</div>
      </div>
      <h1 className="text-4xl font-bold mt-3">{login?'SignIn':'SignUp'}</h1>
      <form className="space-y-5 rounded-lg" onSubmit={(e)=> handleSubmit(e,login?'signin':'signup')}>
        <input className=' border-2 border-white p-4 w-80' name='email' placeholder='Email' /><br/>
        <input className=' border-2 border-white p-4 w-80' name='password' type='password' placeholder='Password'/><br/>
        <button className='p-3 bg-slate-200 border-2 border-black mt-4 w-28'>{login?'signIn':'signUp'}</button>
      </form>
    </div>  
    </div>
    </>
  )
}

export default GetStarted;