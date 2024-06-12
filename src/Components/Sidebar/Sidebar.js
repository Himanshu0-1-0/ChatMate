'use client'
import "./Sidebar.css";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import ConvoItem from "../ConvoItem/ConvoItem";
import GroupModal from "./GrpModal/GrpModal";
import { toast } from 'react-toastify';
import { useState,useRef,useEffect } from "react";
export default function Sidebar() {
  //states
  const [isGrpModalOpen,setIsGrpModalOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [isLoad,setIsLoad]=useState(true);
  //refs
  const SearchBoxRef= useRef(null);

  // toasts
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

  const successToast = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  // use effect 

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoad(true);
      try {
        const response = await fetch('http://localhost:5000/chat/getchats', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          errorToast('Failed to fetch chats, Please Reload..');
          return;
        }
        const data = await response.json();
        setChats(data.chats);
      } catch (error) {
        errorToast(error.message);
      } finally{
        setIsLoad(false);
      }
    };
    fetchChats();
  }, []);

  //fncts
  function handleGrpModal(){
    setIsGrpModalOpen(true);
  }
  function makeGrpModalOff(){
    setIsGrpModalOpen(false);
  }
  const AddToBackend = async () => {
    if (!SearchBoxRef.current || SearchBoxRef.current.value === "") {
      errorToast("Please Provide UserName");
      return;
    }
    const inputValue = SearchBoxRef.current.value;

    try {
      // Make the POST request to the backend
      const response = await fetch('http://localhost:5000/chat/addChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ username: inputValue }), // Ensure the key is 'username'
      });
      const result = await response.json();
      
      if (!response.ok) {
        // const errorText = await response.text();
        errorToast(result.error);
        return;
      }

      successToast(result.message);
    } catch (error) {
      errorToast(error.message);
    }
  };

  // return
  return (
    <div className="conta">
      <GroupModal isOpen={isGrpModalOpen} onRequestClose={makeGrpModalOff}/>
      <div className="topp border border-dark">
        <div className="ele">
          <PublicIcon />
          <div className="p">Global Chat</div>
        </div>
        <button className="grpp-btnn" onClick={handleGrpModal}>
        <div className="ele">
          <GroupsIcon />
          <div className="p">Add Group</div>
        </div>
        </button>
      </div>
      <div className="search">
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control border border-dark ip"
            placeholder="Search Username..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            ref={SearchBoxRef}
          />
          <div className="input-group-append ">
            <button className="btn btn-dark border border-dark ip"  type="button" onClick={AddToBackend}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="convo border border-dark">
      {isLoad ? ( // Show loading text if loading
          <div className="loading-text">Loading...</div>
        ) : ( chats.length ===0 ? <div><h3>Search Usernames to add to chat..</h3></div>:
          chats.map((chat, index) => (
            <ConvoItem
            key={index}
            _id={chat._id}
            name={chat.isGrpChat ? chat.grpName : chat.otherUsername}
            msg={chat.lastMessage || "No messages yet"}
            time={chat.lastMessageTime ? new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
            profilepic={chat.isGrpChat ? chat.grpProfilePic : chat.otherUserProfilePic}
          />
          ))
        )}
      </div>
    </div>
  );
}
