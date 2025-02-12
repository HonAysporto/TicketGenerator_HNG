

import './App.css'

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
