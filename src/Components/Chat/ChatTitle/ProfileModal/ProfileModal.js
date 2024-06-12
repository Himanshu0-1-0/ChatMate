"use client";
import { toast } from "react-toastify";
import "./ProfileModal.css";
import { useState,useRef } from "react";
import Modal from "react-modal";

const ProfileModal = ({ isOpen, onRequestClose, Dataa }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const grpNameRef =useRef(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

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
  //
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
    //   width: "80%",  
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      errorToast('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('chatId', Dataa._id);

    try {
      const response = await fetch('http://localhost:5000/uploadGroupProfilePic', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        errorToast(`Error: ${errorData.message || 'Failed to upload image.'}`);
        return;
      }

      const data = await response.json();
      successToast('Group profile picture uploaded successfully.');
      // Handle the success response data if needed
      console.log(data);
    } catch (error) {
    //   console.error('Error uploading image:', error);
      errorToast('An error occurred while uploading the image.');
    }
  };

  const handleChngGrp =async ()=>{
    const name= grpNameRef.current.value.trim();
    if(name===""){
        errorToast("Enter Valid Grp Name");
        return;
    }
    try{
        const response= await fetch("http://localhost:5000/chat/changeGrpName",{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ chatId:Dataa._id, name }),
        })

      if (!response.ok) {
        const errorData = await response.json();
        errorToast(`Error: ${errorData.message || 'Failed to update group info.'}`);
        return;
      }
      const data = await response.json();
      successToast('Group name updated successfully.');
    }catch{
        errorToast('An error occurred while updating the group name.');
    }
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        // className="cuss"
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="content-grpmodal">
          <button onClick={onRequestClose} className="btn btn-danger clos-btn">
            X
          </button>
          <div className="container ">
            <div className="ppp ">
              <div className="ppp-img m-5">
                <img
                  src={
                    Dataa.isGrpChat
                      ? Dataa.grpProfilePic
                      : Dataa.otherUserProfilePic
                  }
                  alt="Profile Pic"
                  className="border"
                />
              </div>
              {Dataa.isGrpChat ? (
                <div className="ppp-btns">
                  <div class="mb-3">
                    {/* <label for="formFileSm" class="form-label">Small file input example</label> */}
                    <input
                      className="form-control form-control-sm"
                      id="formFileSm"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleUpload}>
                    Change Grp Photo
                  </button>
                </div>
              ) : undefined}
            </div>
            <div className="ppp-name">
              {Dataa.isGrpChat ? (
                <div className="pppura">
                  <div class="input-group m-4">
                    <input
                      type="text"
                      className="form-control lol"
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={Dataa.grpName}
                      readOnly
                    />
                  </div>
                  <div className="input-group m-4">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Change Grp Name"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      ref={grpNameRef}
                    />
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button" onClick={handleChngGrp}>
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="input-group mb-3">
                  <input
                    type="text" 
                    className="form-control lol"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={Dataa.otherUsername}
                    readOnly
                  />
                </div>
              )}
            </div>
            <div className="ppp-mem">
                {Dataa.isGrpChat? <div className="m-3"><h2>Members:</h2></div>:undefined}
              {Dataa.isGrpChat
                ? Dataa.members.map((member) => (
                    <div key={member._id} className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control lol"
                        value={member.username}
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        readOnly
                      />
                      {Dataa.admin._id === Dataa.selfId && (
                        <div className="input-group-append">
                          <button className="btn btn-danger">Remove</button>
                        </div>
                      )}
                    </div>
                  ))
                : undefined}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModal;
