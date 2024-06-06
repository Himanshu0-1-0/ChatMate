import "./Chat.css"
import MsgArea from "./MsgArea/MsgArea"
import ChatTitle from"./ChatTitle/ChatTitle"
import SendMsg from "./SendMsg/SendMsg"
export default function Chat() {
  return (
    <div className="chat-cont">
      <div className="chat-title border border-dark">
        <ChatTitle/>
      </div>
      <div className="msg-area border border-dark">
        <MsgArea/>
      </div>
      <div className="msg-btn border border-dark">
        <SendMsg/>
      </div>
    </div>
  )
}
