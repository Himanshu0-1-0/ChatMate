// TagInput.js
import React, { useState, useRef } from "react";
import "./TagInput.css"; // Make sure to create a CSS file for styling
import { toast } from 'react-toastify';
const TagInput = () => {
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);
  const grpnameref = useRef(null);
  
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


  const handleAddTag = () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue !== "") {
      setTags([...tags, inputValue]);
      inputRef.current.value = "";
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleCreateGrp = async ()=>{
    const grpname = grpnameref.current.value.trim();
    if (grpname === "") {
      errorToast("Group name cannot be empty");
      return;
    }
    if (tags.length === 0) {
      errorToast("Please add at least one username");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/chat/addGrp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth method
        },
        body: JSON.stringify({
          grpname,
          usernames: tags
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        successToast("Group chat created successfully");
      } else {
        errorToast(data.error || "Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
      errorToast("Server error");
    }
  }
  return (
    <div className="tag-input">
      <div className="grptg">
        <h1>Create Group With Your Friends.. </h1>
      </div>
      <div className="grpnameip">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control inp-tp border border-dark"
            placeholder="Group Name.."
            ref={grpnameref}
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div className="tagip">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control inp-tp border border-dark"
            placeholder="Enter Valid Usernames.."
            ref={inputRef}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-dark" type="button" onClick={handleAddTag}>
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="tagss my-2">
      {tags.map((tag, index) => (
          <div key={index} className="tag border ">
            <div className="tag-co mx-3">
                {tag}
            </div>
            <button className="remove-tag btn btn-danger" onClick={() => removeTag(index)}>
              x
            </button>
          </div>
        ))}
      </div>
      <div className="cretebtn my-2">
        <button className="btn btn-success" onClick={handleCreateGrp}>Create Group.</button>
      </div>
    </div>
  );
};

export default TagInput;
