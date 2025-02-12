import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import Registration from './Registration'
import FileUpload from './FileUpload'
import Navbar from './Navbar'
import Form from './Form'
import TicketSelection from './TicketSelection'
import Ticket from './Ticket'
import { Route, Routes } from 'react-router-dom'

function App() {
 

  return (
    <>
 
<Routes>
  <Route path='/' element={<TicketSelection/>}/>
  <Route path='/reg' element={<Form/>}/>
  <Route path='/ticket' element={<Ticket/>}/>
</Routes>

    </>
  )
}

export default App
