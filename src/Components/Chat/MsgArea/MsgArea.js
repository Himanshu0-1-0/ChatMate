import "./MsgArea.css"
import SelfMsg from "./SelfMsg/SelfMsg"
import OtherMsg from "./OtherMsg/OtherMsg"
import { useRef,useEffect,useState } from "react";

// let socket;

export default function MsgArea({ messages,Dataa}) {
 

  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); 
  // useEffect(() => {

  //   socket = io('http://localhost:5000', {
  //     auth: {
  //       token: localStorage.getItem('token'), // Ensure you have a valid token stored in the browser
  //     },
  //   });

  //   // Listen for 'newMessage' event
  //   socket.on('newMessage', (message) => {
  //     console.log('New message received:', message);
  //     setMessages(prevMessages => [...prevMessages, message]); // Add new message to state
  //     scrollToBottom(); // Scroll to bottom when new message arrives
  //   });

  //   // Clean up socket event listener on unmount
  //   return () => {
  //     socket.off('newMessage');
  //   };
  // }, []);

  return (
    <div className="msgg-con">
      <div className="msges">
      {messages.map((msg, index) => {
          // Determine if the message is from the current user or from another user
          const isSelfMsg = msg.sender._id === Dataa.selfId;

          // Render SelfMsg or OtherMsg based on the sender of the message
          return isSelfMsg ? (
            <SelfMsg key={msg._id} content={msg.content} timestamp={msg.createdAt} />
          ) : (
            <OtherMsg
              key={msg._id}
              content={msg.content}
              username={msg.sender.username}
              profilepic={msg.sender.profilePic}
              timestamp={msg.createdAt}
            />
          );
        })}
       <div ref={messagesEndRef} />
      </div>
      
    </div>
  )
}
