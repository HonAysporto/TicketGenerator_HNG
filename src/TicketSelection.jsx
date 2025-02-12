import { useState } from 'react'
import Navbar from './Navbar'
import './TicketSelection.css'
import { useNavigate } from 'react-router-dom';



const TicketSelection = () => {

  const navigate = useNavigate();

  const [noTicket, setnoTicket] = useState(1)

  const handleInputChange = (event) => {
    setnoTicket(event.target.value)
    
  }

  const next = () => {
    console.log(noTicket);
    navigate('/reg', { state: { noTicket: noTicket } });
    
  }

  return (
    <>
    <Navbar/>
    <div className="form-container">
        <div className="form-body">
        <div className="title">
          <p >Ticket Selection</p>
          <span>Step 1/3</span>
        </div>

        <div className="progress-bar">
        <div className="progress" style={{ width: "33%" }}></div>
        </div>

        <div className="main-form3">

        <div className="img_upload_div3">
        
            <h1>Techember Fest "25</h1>
            <p>Join us for an unforgettable experience at</p>
            <p >Tech Fest! Secure your spot now.</p>

            <p className='lastp'>📍 Ibadan   ||  March 15, 2025 | 7:00PM</p>

        </div>

        <hr />

        <div className='tickets'>
            <p className='head'>Select Ticket Type</p>

            <div className='tickets-cards'>
                <div className=' freeTicket'>
                    <h1>Free</h1>
                    <p>REGULAR ACCESS</p>
                    <span>20/52</span>
                </div>
                <div className='ticke ticket'>
                    <h1>$150</h1>
                    <p>VIP ACCESS</p>
                    <span>20/52</span>
                </div>
                <div className='ticke ticket'>
                    <h1>$150</h1>
                    <p>VVIP ACCESS</p>
                    <span>20/52</span>
                </div>
            </div>

        </div>

        <form>
              <div className="form-group3">
                <label htmlFor="number">Number of Tickets: </label>
                <input
                  id="number"
                  type="number"
                  name="number"
                  value={noTicket}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
            </form>

        <div className="button-div">
          <button onClick={()=>window.location.reload()} className="a">Cancel</button>
          <button onClick={next} className="b">Next</button>
        </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default TicketSelection