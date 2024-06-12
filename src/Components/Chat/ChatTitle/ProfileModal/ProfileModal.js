"use client";
import { WidthFull } from "@mui/icons-material";
import "./ProfileModal.css";
import React from "react";
import Modal from "react-modal";

const ProfileModal = ({ isOpen, onRequestClose, Dataa }) => {
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

  // let subtitle;
  console.log(Dataa.admin);
  console.log(Dataa.selfId);
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
                    />
                  </div>
                  <button className="btn btn-primary">
                    Change Profile Photo
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
                    />
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button">
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
