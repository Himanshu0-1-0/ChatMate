'use client'
import "./ProfilePage.css"
import { toast } from 'react-toastify';
import { useRef,useState } from "react";
export default function ProfilePage({user}) {
    const [selectedFile, setSelectedFile] = useState(null);
    

    const currps = useRef(null);
    const newps = useRef(null);

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
    const handleChangePassword = async () => {
        const currentPassword=currps.current.value.trim();
        const newPassword = newps.current.value.trim();
        const storedToken = localStorage.getItem("token");

        if (!currentPassword || !newPassword ) {
            errorToast("Please fill in all fields");
          return;
        }
    
        try {
          const response = await fetch('http://localhost:5000/user/changePassword', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storedToken}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
          });
    
          if (!response.ok) {
            throw new Error("Wrong Password");
          }
    
          const data = await response.json();
          successToast(data.message);
          currps.current.value="";
          newps.current.value="";
        } catch (error) {
          errorToast(error.message);
        //   console.error("Error changing password:", error);
        }
      };

      const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

      const handleUpload = async ()=>{
        if (!selectedFile) {
            errorToast("Please select an image");
            return;
        }
        try {
            const formData = new FormData();
            const storedToken = localStorage.getItem("token");
            formData.append("image", selectedFile);
        
            const response = await fetch("http://localhost:5000/uploadProfilePic", {
              method: "POST",
              headers:{
                "Authorization": `Bearer ${storedToken}`,
              },
              body: formData, // Sending FormData object directly
            });
        
            if (!response.ok) {
              throw new Error("An error occurred while uploading the image");
            }
        
            const data = await response.json();
            successToast("Image Uploaded");
          } catch (error) {
            errorToast("An error occurred while uploading the image.. Try choosing another image");
            console.error("Error uploading image:", error);
          }
      
      }

  return (
    <div className="conntt">
        <div className="container mt-3">
      {/* Profile Photo */}
      <div className="text-center mb-3">
        <img
          src={user.profilePic } 
          alt="Profile"
          className="img-fluid rounded-circle profile-photo prof-img border "
        />
        <div className="ll">
        <input type="file"  onChange={handleFileChange} className="mx-4" name="image"/>
        <button className="btn btn-primary m-3 " onClick={handleUpload}>Change Profile Pic</button>
        </div>
      </div>

      {/* User Information */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control red-on" id="username" value={user?user.username:"Loading"} readOnly />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control red-on" id="email" value={user?user.email:"Loading"} readOnly />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="mt-3">
        <h4>Change Password</h4>
        <div className="form-group m-3">
          <label htmlFor="currentPassword" >Current Password</label>
          <input type="password" className="form-control mt-2 lbb" id="currentPassword" placeholder="Enter current password" ref={currps} required/>
        </div>
        <div className="form-group m-3">
          <label htmlFor="newPassword">New Password</label>
          <input type="password" className="form-control mt-2 lbb" id="newPassword" placeholder="Enter new password" ref={newps}required/>
        </div>
        <button className="btn btn-danger mb-3" onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
    </div>
  )
}
