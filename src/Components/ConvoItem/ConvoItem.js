import "./ConvoItem.css"
export default function ConvoItem({name,msg,time}) {
    let msgs = msg.length;
    let MessageShort=msg;
    if(msgs>24 ){
        MessageShort = MessageShort.substr(0,21)+ "..."
    }
  return (
    <div className="convo-item-cont  border-bottom" >
        <div className="div1">
        <div className="convo-img">
        <img src="/convoitem/icon1.avif" alt="" />
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
  )
}
