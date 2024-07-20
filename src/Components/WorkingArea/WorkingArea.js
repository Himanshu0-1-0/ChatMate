'use client';
import React, { useState, useEffect } from "react";
import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";
import "./WorkingArea.css";

export default function WorkingArea({ chatID,isSidebarOpen}) {
  const [Dataa, setDataa] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  useEffect(() => {
    if (chatID.length === 24) {
      setIsLoading(true);
      if (chatID) {
        const fetchChatDetails = async () => {
          try {
            const response = await fetch("https://chatmate-backend-8usd.onrender.com/msg/getMsg", {
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
              setMessages(data.messages);
              console.log(data.messages);
            } else {
              console.error(data.error || "Failed to fetch chat details");
            }
          } catch (error) {
            console.error("Error fetching chat details:", error);
          }
        };

        fetchChatDetails();
      }
    }
  }, [chatID]);

  return (
    <>
      {/* <button className="toggle-button" onClick={toggleSidebar}>
          Open Chats..
      </button> */}
      <div className="con">
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <Sidebar setMessages={setMessages} />
        </div>
        <div className={`changeArea ${isSidebarOpen ? 'chatop' : ''}`}>
          {chatID === 'homepage' ? (
            <div className="pogo">
              <img src="/Logo.png" alt="Logo" />
            </div>
          ) : (
            isLoading ? (
              <div>Loading...</div>
            ) : (
              <Chat Dataa={Dataa} messages={messages} />
            )
          )}
        </div>
      </div>
    </>
  );
}
