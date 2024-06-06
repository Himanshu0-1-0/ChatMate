import "./SendMsg.css"
import SendIcon from '@mui/icons-material/Send';
export default function SendMsg() {
  return (
    <div className="send-msg-cont">
      <div className="txtar mx-2">
        <textarea className="ip" placeholder="Send Message.." rows={1}/>
      </div>
      <div className="sendbtn mx-3"><SendIcon/></div>
    </div>
  )
}
