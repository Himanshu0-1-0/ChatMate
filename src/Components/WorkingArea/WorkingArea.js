import Chat from "../Chat/Chat"
import Sidebar from "../Sidebar/Sidebar"
import "./WorkingArea.css"

export default function WorkingArea() {
  return (
    <>
      <div className="con">
        <div className="sidebar">
            <Sidebar/>
        </div>
        <div className="changeArea ">
          <Chat/>
        </div>
      </div>
    </>
  )
}
