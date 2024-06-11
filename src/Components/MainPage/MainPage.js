'use client'
import Navbar from "../Navbar/Navbar"
import WorkingArea from "../WorkingArea/WorkingArea"
import ProfilePage from "../ProfilePage/ProfilePage"
import { toast } from 'react-toastify';
import "./MainPage.css"
import { useState,useEffect } from "react"
export default function MainPage({chatID}) {
  const [currentState, setCurrentState] = useState('chats');
  const [user, setUser] = useState(null);
  const [loadings, setLoadings] = useState(true);



  const errorToast = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };



  useEffect(() => {
    const fetchProfile = async () => {
      setLoadings(true);

      try {
        const response = await fetch('http://localhost:5000/user/getProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        errorToast(`Error: ${error.message}`);
      } finally {
        setLoadings(false);
        console.log(user)
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className="cont">
        <Navbar setCurrentState={setCurrentState}/>
        {/* <WorkingArea chatID={chatID}/> */}
        {/* <ProfilePage/> */}
        {loadings ? <div>Loading...</div>: (currentState==='chats' ? <WorkingArea chatID={chatID}/>: <ProfilePage user={user}/>)}
      </div>
    </>
  )
}

