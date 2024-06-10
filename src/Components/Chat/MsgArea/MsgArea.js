import "./MsgArea.css"
import SelfMsg from "./SelfMsg/SelfMsg"
import OtherMsg from "./OtherMsg/OtherMsg"
export default function MsgArea({ Dataa }) {
  return (
    <div className="msgg-con">
      <div className="msges">
      {Dataa.messages.map((msg, index) => {
          // Determine if the message is from the current user or from another user
          const isSelfMsg = msg.sender._id === Dataa.selfId;

          // Render SelfMsg or OtherMsg based on the sender of the message
          return isSelfMsg ? (
            <SelfMsg key={msg._id} content={msg.content} timestamp={msg.createdAt} />
          ) : (
            <OtherMsg
              key={msg._id}
              content={msg.content}
              username={msg.sender.username}
              profilepic={msg.sender.profilePic}
              timestamp={msg.createdAt}
            />
          );
        })}

      </div>
      
    </div>
  )
}
