import "./OtherMsg.css"

export default function OtherMsg({content,timestamp,username,profilepic}) {
  return (
    <div className="OthMsg-cont">
        <div className="o-img mx-3">
            <img src={profilepic} alt="Other Img" />
        </div>
      <div className="msg-o">
        <div className="o-nam">{username}</div>
        <div className="o-gg">{content}</div>
        <div className="o-time">{timestamp}</div>
      </div>
    </div>
  )
}
