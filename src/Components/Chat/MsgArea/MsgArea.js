import "./MsgArea.css"
import SelfMsg from "./SelfMsg/SelfMsg"
import OtherMsg from "./OtherMsg/OtherMsg"
export default function MsgArea() {
  return (
    <div className="msgg-con">
      <div className="msges">
        <OtherMsg />
        <SelfMsg/>
        <OtherMsg />
        <OtherMsg />
        <SelfMsg/>
        <SelfMsg/>
        <SelfMsg/>
        <OtherMsg />
        <SelfMsg/>
        <OtherMsg />
        <SelfMsg/>

      </div>
      
    </div>
  )
}
