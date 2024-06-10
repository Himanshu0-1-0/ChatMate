import "./SelfMsg.css"

export default function SelfMsg({content,timestamp}) {
  const dt = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div className="SelfMsg-cont">
      <div className="msg-s">
      <div className="self-nam">You</div>
        <div className="self-gg">{content}</div>
        <div className="self-time">{dt}</div>
      </div>
    </div>
  )
}
