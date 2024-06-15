'use client'
import Chat from "../Chat/Chat"
import Sidebar from "../Sidebar/Sidebar"
import "./WorkingArea.css"
import { useState ,useEffect} from "react";
export default function WorkingArea({chatID}) {
  const [Dataa, setDataa] = useState(null);
  const [isLoading,setIsLoading] =useState(true);
  if(chatID.length===24){
    useEffect(() => {
      setIsLoading(true);
      if (chatID) {
        const fetchChatDetails = async () => {
          try {
            const response = await fetch("http://localhost:5000/msg/getMsg", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}` 
              },
              body: JSON.stringify({ chatId: chatID })
            });
  
            const data = await response.json();
  
            if (response.ok) {
              setDataa(data);
              setIsLoading(false);
            } else {
              console.error(data.error || "Failed to fetch chat details");
            }
          } catch (error) {
            console.error("Error fetching chat details:", error);
          }
        };
  
        fetchChatDetails();
      }
    }, [chatID]);
  }


  return (
    <>
      <div className="con">
        <div className="sidebar">
            <Sidebar/>
        </div>
        <div className="changeArea ">
          {chatID=='homepage'? <div className="pogo"><img src="/Logo.png" alt="Logo"></img></div> : (isLoading? <div>Loading...</div>:<Chat Dataa={Dataa}/>)}
        </div>
      </div>
    </>
  )
} 
