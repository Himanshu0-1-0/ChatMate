'use client'
import "./Sidebar.css";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import ConvoItem from "../ConvoItem/ConvoItem";
import GroupModal from "./GrpModal/GrpModal";
import { toast } from 'react-toastify';
import { useState,useRef } from "react";
export default function Sidebar() {
  //states
  const [isGrpModalOpen,setIsGrpModalOpen] = useState(false);

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
      const response = await fetch('http://localhost:5000/user/addChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ username: inputValue }), // Ensure the key is 'username'
      });

      if (!response.ok) {
        const errorText = await response.text();
        errorToast(`Network response was not ok: ${errorText}`);
        return;
      }

      const result = await response.json();
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
        <ConvoItem name="Himanshu" msg="Hello.. How Are..." time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
      </div>
    </div>
  );
}
