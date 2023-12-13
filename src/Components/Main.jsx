import {database} from "./Firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
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
      history('/signOut')
    }).catch (err=>{
      alert(err.code)
      setLogin(true)
    })
   }
  }
  return (
    <>
    <div className='grid justify-center text-center space-y-5'>
      <div className='flex flex-row justify-between text-2xl font-bold'>
        {/* <div className={login == false?'activeColour':'pointer'} onClick={() => setLogin(false)}>SignUp</div> */}
        {/* <div className={login == true?'activeColour':'pointer'} onClick={() => setLogin(true)}>SignIn</div> */}
      </div>
      <h1 className="text-4xl font-bold mt-3 text-center flex flex-col">{login?'signIn':'WELCOME'}</h1>
      <form onSubmit={(e)=> handleSubmit(e,login?'signin':'signup')}>
<p className='uppercase'>hey there welcome to your personal note app. we prioritise your privacy here so you can have your thoughts written here with no intruders <em className='text-slate-300'> &lt; sign out &gt;</em> when you done to keep you details coded and lock to all but you.</p><br />
<h1 className='font-bold'>Use The Below Icon to Get Started</h1>
        {/* <input className=' border-2 border-blue-500 p-4 w-80' name='email' placeholder='Email' /><br/> */}
        {/* <input className=' border-2 border-blue-500 p-4 w-80' name='password' type='password' placeholder='Password'/><br/> */}
        <button className='p-3 mt-3 text-2xl border-2'><Link to="/Login"><Icon icon="jam:write-f" /></Link></button>
      </form>
    </div>
    </>
  )
}

export default GetStarted;