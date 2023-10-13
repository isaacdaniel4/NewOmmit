// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import GetStarted from './Components/GetStarted'
import Home from './Components/Home'
import Main from "./Components/Main"
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStarted/>} />
        <Route path="/Login" element={<Home/>} />
        <Route path="/signOut" element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
