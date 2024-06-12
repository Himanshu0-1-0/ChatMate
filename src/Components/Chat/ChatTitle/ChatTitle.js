import "./ChatTitle.css"
import DeleteIcon from '@mui/icons-material/Delete';
import CallIcon from '@mui/icons-material/Call';
import GroupIcon from '@mui/icons-material/Group';
import ProfileModal from "./ProfileModal/ProfileModal"
import { useState } from "react";
export default function ChatTitle({per_name,per_pic,Dataa}) {
  const [isPOpen,setIsPOpen] = useState(false);
  const change = ()=>{
    setIsPOpen(prev=>{
      const ch= !prev;
      return ch;
    })
  }
  return (
    <>
    <div className="title-cont">
      <div className="base  mx-4">
        <div className="photo-prof">
          <img src={per_pic} alt="Profile Photo" className="border border-dark"/>
        </div>
        <div className="name-prof mx-4">
          {per_name}
        </div>
      </div>
      <div className="delete mx-5">
        <div className="del mx-4"> <button onClick={change}><GroupIcon/></button></div>
        <div className="call "><CallIcon/></div>
        {/* <div className="del"> <DeleteIcon/></div> */}
      </div>
    </div>
      <ProfileModal isOpen={isPOpen} onRequestClose={change} Dataa={Dataa}/>
    </>
  )
}
