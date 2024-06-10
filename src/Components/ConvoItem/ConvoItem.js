import "./ConvoItem.css"
import Link from "next/link";
export default function ConvoItem({_id,name, msg, time, profilepic}) {
    let msgs = msg.length;
    let MessageShort=msg;
    if(msgs>24 ){
        MessageShort = MessageShort.substr(0,21)+ "..."
    }
  return (
    <Link href={`/Chats/${_id}`} className="ll">
    <div className="convo-item-cont  border-bottom" >
        <div className="div1">
        <div className="convo-img">
        <img src={profilepic} alt={`${name}'s profile`} />
      </div>
      <div className="name">
        <div className="na">
            {name}
        </div>
        <div className="last-msg">
            {MessageShort}
        </div>
      </div>
        </div>
      
      <div className="last-seen">
        {time}
        </div>
    </div>
    </Link>
  )
}
