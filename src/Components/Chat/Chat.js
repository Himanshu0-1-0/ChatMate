import "./Chat.css"
import MsgArea from "./MsgArea/MsgArea"
import ChatTitle from"./ChatTitle/ChatTitle"
import SendMsg from "./SendMsg/SendMsg"
export default function Chat({Dataa,messages}) {
  // console.log(Dataa);
  return (
    <div className="chat-cont">
      <div className="chat-title border border-dark">
        <ChatTitle per_name={Dataa.isGrpChat?Dataa.grpName:Dataa.otherUsername} per_pic={Dataa.isGrpChat?Dataa.grpProfilePic:Dataa.otherUserProfilePic} Dataa={Dataa}/>
      </div>
      <div className="msg-area border border-dark">
        <MsgArea Dataa={Dataa} messages={messages} />
      </div>
      <div className="msg-btn border border-dark">
        <SendMsg chatId={Dataa._id}/>
      </div>
    </div>
  )
}
