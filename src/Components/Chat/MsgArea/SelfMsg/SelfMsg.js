import "./SelfMsg.css"

export default function SelfMsg({content,timestamp}) {
  return (
    <div className="SelfMsg-cont">
      <div className="msg-s">
      <div className="self-nam">You</div>
        <div className="self-gg">{content}</div>
        <div className="self-time">{timestamp}</div>
      </div>
    </div>
  )
}
