import Navbar from "../Navbar/Navbar"
import WorkingArea from "../WorkingArea/WorkingArea"
import ProfilePage from "../ProfilePage/ProfilePage"
import "./MainPage.css"

export default function MainPage({chatID}) {
  return (
    <>
      <div className="cont">
        <Navbar/>
        {/* <WorkingArea chatID={chatID}/> */}
        <ProfilePage/>
      </div>
    </>
  )
}

