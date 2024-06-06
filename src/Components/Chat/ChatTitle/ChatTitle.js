import "./ChatTitle.css"
import DeleteIcon from '@mui/icons-material/Delete';
import CallIcon from '@mui/icons-material/Call';
export default function ChatTitle() {
  return (
    <div className="title-cont">
      <div className="base  mx-4">
        <div className="photo-prof">
          <img src="/convoitem/icon1.avif" alt="Profile Photo" className="border border-dark"/>
        </div>
        <div className="name-prof mx-4">
          Himanshu
        </div>
      </div>
      <div className="delete mx-5">
        <div className="call mx-4"><CallIcon/></div>
        <div className="del"> <DeleteIcon/></div>
      </div>
    </div>
  )
}
