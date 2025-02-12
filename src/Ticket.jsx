import './Ticket.css';
import Navbar from './Navbar';
import barcode from '../public/Image/bar.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Ticket = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate =  useNavigate()

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInput'));
    setUserInfo(storedUserInfo);
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  if (!userInfo) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="form-container">
        <div className="form-body">
          <div className="title">
            <p>Ready</p>
            <span>Step 3/3</span>
          </div>

          <div className="progress-bar">
            <div className="progress" style={{ width: "99%" }}></div>
          </div>

          <div className='heading-div'>
            <h1 className='heading'>Your Ticket is Booked</h1>
            <p className='sub-heading'>You can download or check your email for a copy</p>
          </div>

          <div className='style-div'>
            <div className='box1'></div>
            <div className='box2'></div>
            <div className='box3'></div>
            <div className='box4'></div>

            <div className="main-form">
              <h1>Techember Fest '25</h1>
              <p className='loca'>📍 04 Rumens road, Ikoyi, Lagos</p>
              <p className='loca'>📆 March 15, 2025 | 7:00 PM</p>

              <img className='image'
                src={userInfo?.avatarUrl || 'data:image/jpeg;base64,/9j/...'}
                alt="User Avatar"
              />

              <div className='table'>
                <div className='table1'>
                  <div>
                    <span>Enter your name</span>
                    <p className='subp'>{userInfo?.fullName || 'N/A'}</p>
                  </div>
                  <div className='div2'>
                    <span>Enter your Email</span>
                    <p className='subp'>{userInfo?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className='table1'>
                  <div className='wal'>
                    <span>Ticket Type</span>
                    <p className='subp'>Regular</p>
                  </div>
                  <div className='div2 wal'>
                    <span>Ticket for:</span>
                    <p className='subp'>{userInfo?.noTicket || 'N/A'}</p>
                  </div>
                </div>
                <div className='table3'>
                  <span>Special request?</span>
                  <p className='subp'>Nil</p>
                </div>
              </div>
            </div>
          </div>

          <div className='barcode'>
            <div className='box1'></div>
            <div className='box2'></div>
            <div className='box3'></div>
            <div className='box4'></div>
            <img src={barcode} alt="Barcode" />
          </div>

          <div className="button-div">
            <button onClick={() => navigate("/")} className="a">Book Another Ticket</button>
            <button className="b">Download Ticket</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Ticket;
